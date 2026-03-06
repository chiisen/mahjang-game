// ===========================================
// Game Module
// 遊戲主邏輯：狀態管理、回合控制
// ===========================================

const GameState = {
    INIT: 'init',
    DEALING: 'dealing',
    PLAYING: 'playing',
    ROUND_END: 'round_end',
    GAME_OVER: 'game_over'
};

const PlayerDirection = ['east', 'south', 'west', 'north'];

const Logger = {
    log: (msg, data) => console.log(`[麻將] ${msg}`, data || ''),
    error: (msg, err) => console.error(`[麻將錯誤] ${msg}`, err),
    warn: (msg, data) => console.warn(`[麻將警告] ${msg}`, data || ''),
    info: (msg, data) => console.info(`[麻將資訊] ${msg}`, data || '')
};

class Game {
    constructor() {
        Logger.log('初始化遊戲...');
        this.tileSet = null;
        this.players = [];
        this.currentPlayer = 0;
        this.state = GameState.INIT;
        this.dealer = 0;
        this.consecutiveWins = 0;
        this.lastDiscard = null;
        this.lastDraw = null;
        this.winner = null;

        try {
            this.initPlayers();
            this.bindEvents();
            Logger.log('遊戲初始化完成');
        } catch (err) {
            Logger.error('遊戲初始化失敗', err);
        }
    }

    initPlayers() {
        this.players = [
            new Player(0, '東家 (你)', true),
            new AIPlayer(1, '南家'),
            new AIPlayer(2, '西家'),
            new AIPlayer(3, '北家')
        ];

        this.players.forEach((p, i) => {
            p.direction = PlayerDirection[i];
            p.isDealer = (i === this.dealer);
        });
        Logger.log('玩家初始化完成', { players: this.players.map(p => p.name) });
    }

    bindEvents() {
        const newGameBtn = document.getElementById('btn-new-game');
        if (!newGameBtn) {
            Logger.warn('找不到新局按鈕');
        } else {
            newGameBtn.addEventListener('click', () => {
                Logger.log('點擊新局按鈕');
                this.startNewGame();
            });
        }

        const btnIds = ['btn-chow', 'btn-pong', 'btn-kong', 'btn-win'];
        btnIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    Logger.log(`點擊動作按鈕: ${id}`);
                    this.playerAction(id.replace('btn-', ''));
                });
            } else {
                Logger.warn(`找不到按鈕: ${id}`);
            }
        });
    }

    startNewGame() {
        Logger.log('========== 開始新遊戲 ==========');

        try {
            this.tileSet = new TileSet();
            Logger.log('牌組建立完成', { totalTiles: this.tileSet.tiles.length });

            this.players.forEach(p => p.reset());
            Logger.log('玩家重置完成');

            this.dealer = Math.floor(Math.random() * 4);
            this.currentPlayer = this.dealer;
            this.consecutiveWins = 0;
            this.winner = null;

            Logger.log(`莊家: ${PlayerDirection[this.dealer]} (${this.dealer})`);

            this.players.forEach((p, i) => {
                p.isDealer = (i === this.dealer);
            });

            this.dealTiles();
            this.updateUI();

            this.state = GameState.PLAYING;
            Logger.log('遊戲狀態: PLAYING');
            this.playTurn();
        } catch (err) {
            Logger.error('開始新遊戲失敗', err);
        }
    }

    dealTiles() {
        const tilesPerPlayer = 16;

        for (let i = 0; i < tilesPerPlayer; i++) {
            for (let j = 0; j < 4; j++) {
                const tile = this.tileSet.draw();
                if (tile) {
                    this.players[j].drawTile(tile);
                }
            }
        }

        this.players[this.dealer].drawTile(this.tileSet.draw());

        this.players.forEach(p => p.sortHand());

        Logger.log('發牌完成', {
            remainingTiles: this.tileSet.remaining(),
            playerHands: this.players.map(p => p.hand.length)
        });
    }

    playTurn() {
        const player = this.players[this.currentPlayer];
        Logger.log(`回合開始: ${player.name} (${PlayerDirection[this.currentPlayer]})`);

        if (player.isHuman) {
            Logger.log('玩家回合，啟用動作按鈕');
            this.enableHumanActions();
        } else {
            Logger.log('AI 回合思考中...');
            setTimeout(() => {
                try {
                    this.aiTurn(player);
                } catch (err) {
                    Logger.error('AI 回合執行失敗', err);
                }
            }, 500);
        }
    }

    aiTurn(player) {
        let tile = this.lastDiscard;

        if (!tile) {
            tile = this.tileSet.draw();
            if (!tile) {
                Logger.error('摸牌失敗，牌堆已空');
                return;
            }
            this.lastDraw = tile;
            player.drawTile(tile);
            player.sortHand();
            Logger.log(`AI 摸牌: ${tile.toString()}`);
        }

        try {
            const decision = player.decideAfterDraw(tile);
            Logger.log(`AI 決策: ${decision.action}`, decision);
            this.executeAction(player, decision);
        } catch (err) {
            Logger.error('AI 決策失敗', err);
        }
    }

    executeAction(player, decision) {
        const { action, tile } = decision;
        Logger.log(`執行動作: ${action}`, { player: player.name, tile: tile?.toString() });

        try {
            switch (action) {
                case 'win':
                    this.handleWin(player, tile);
                    break;
                case 'kong':
                    this.handleKong(player, tile);
                    break;
                case 'pong':
                    this.handlePong(player, tile);
                    break;
                case 'chow':
                    this.handleChow(player, tile);
                    break;
                case 'discard':
                    this.handleDiscard(player, tile);
                    break;
                default:
                    Logger.warn(`未知動作: ${action}`);
            }
        } catch (err) {
            Logger.error(`玩家動作執行失敗: ${action}`, err);
        }

        this.disableActions();
    }

    disableActions() {
        const btnIds = ['btn-chow', 'btn-pong', 'btn-kong', 'btn-win'];
        btnIds.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.disabled = true;
        });
        Logger.log('動作按鈕已禁用');
    }

    showWinDialog(winnerName, result) {
        Logger.log('顯示胡牌對話框', { winner: winnerName, result });

        const modal = document.getElementById('modal');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');

        if (!modal || !title || !message) {
            Logger.error('找不到對話框元素');
            return;
        }

        title.textContent = `🎉 ${winnerName} 胡牌!`;
        const detailsHtml = result.details.map(d => `<p>${d}</p>`).join('');
        message.innerHTML = `
            <p><strong>台數: ${result.fans} 台</strong></p>
            <p><strong>分數: ${result.points}</strong></p>
            <hr>
            ${detailsHtml}
        `;

        modal.classList.remove('hidden');
        Logger.log('========== 遊戲結束 ==========');
    }

    updateUI() {
        try {
            const remaining = this.tileSet.remaining();
            const tileCountEl = document.getElementById('tile-count');
            if (tileCountEl) {
                tileCountEl.textContent = `剩餘牌數: ${remaining}`;
            }

            this.renderPlayers();
        } catch (err) {
            Logger.error('更新UI失敗', err);
        }
    }

    renderPlayers() {
        const board = document.getElementById('game-board');
        if (!board) {
            Logger.error('找不到 game-board 元素');
            return;
        }

        try {
            this.players.forEach((player, index) => {
                let area = document.querySelector(`.player-area.${player.direction}`);

                if (!area) {
                    area = this.createPlayerArea(player);
                    board.appendChild(area);
                }

                this.updatePlayerArea(area, player);
            });
        } catch (err) {
            Logger.error('渲染玩家區域失敗', err);
        }
    }

    handleWin(player, tile) {
        this.winner = player;
        Logger.log(`🎉 胡牌! 玩家: ${player.name}`, { tile: tile?.toString() });

        const result = Scoring.calculate(
            player,
            player.hand,
            player.melds,
            true,
            player.isDealer,
            this.consecutiveWins,
            player.flowers
        );

        Logger.log('胡牌結果', result);
        this.showWinDialog(player.name, result);
        this.state = GameState.ROUND_END;
    }

    handleDiscard(player, tile) {
        player.discardTile(tile);
        this.lastDiscard = tile;
        this.lastDraw = null;
        Logger.log(`打牌: ${player.name} 打出 ${tile.toString()}`);

        this.nextPlayer();
        this.updateUI();

        this.checkOtherPlayers();
    }

    checkOtherPlayers() {
        const nextPlayer = this.players[this.currentPlayer];
        Logger.log(`檢查其他玩家: ${nextPlayer.name}`);

        if (nextPlayer.isHuman) {
            return;
        }

        setTimeout(() => {
            try {
                const tile = this.lastDiscard;
                Logger.log(`檢查 ${nextPlayer.name} 是否能吃碰槓胡`, { tile: tile?.toString() });

                const decision = nextPlayer.decide(tile, this);
                Logger.log(`${nextPlayer.name} 決策: ${decision.action}`);

                if (decision.action === 'win' || decision.action === 'pong' || decision.action === 'kong') {
                    this.executeAction(nextPlayer, decision);
                } else {
                    this.playTurn();
                }
            } catch (err) {
                Logger.error('檢查其他玩家失敗', err);
                this.playTurn();
            }
        }, 300);
    }

    handlePong(player, tile) {
        Logger.log(`碰! ${player.name} 碰 ${tile.toString()}`);
        player.removeTile(tile);
        player.removeTile(tile);
        player.addMelds({ type: 'pong', tiles: [tile, tile, tile], from: this.getPrevPlayer(player.id).id });

        this.currentPlayer = player.id;
        this.lastDiscard = null;

        this.updateUI();
        this.playTurn();
    }

    handleKong(player, tile) {
        Logger.log(`槓! ${player.name} 槓 ${tile.toString()}`);
        player.removeTile(tile);
        player.removeTile(tile);
        player.removeTile(tile);
        player.addMelds({ type: 'kong', tiles: [tile, tile, tile, tile], from: 'self' });

        const kongTile = this.tileSet.draw();
        if (kongTile) {
            player.drawTile(kongTile);
            Logger.log(`槓後摸牌: ${kongTile.toString()}`);
        }

        player.sortHand();
        this.updateUI();

        const decision = player.decideAfterDraw(kongTile);
        this.executeAction(player, decision);
    }

    handleChow(player, tile) {
        Logger.log(`吃! ${player.name} 吃 ${tile.toString()}`);
        this.currentPlayer = player.id;
        this.lastDiscard = null;

        this.updateUI();
        this.playTurn();
    }

    nextPlayer() {
        const prev = this.currentPlayer;
        this.currentPlayer = (this.currentPlayer + 1) % 4;
        Logger.log(`換下一位玩家: ${PlayerDirection[prev]} -> ${PlayerDirection[this.currentPlayer]}`);
    }

    getPrevPlayer(playerId) {
        return this.players[(playerId + 3) % 4];
    }

    enableHumanActions() {
        const tile = this.lastDiscard || this.lastDraw;
        const player = this.players[this.currentPlayer];

        if (!tile) {
            Logger.warn('沒有可用的牌用於動作判斷');
            return;
        }

        Logger.log('檢查玩家可用動作', {
            player: player.name,
            tile: tile.toString(),
            canPong: player.canPong(tile),
            canKong: player.canKong(tile, !!this.lastDraw),
            canChow: player.canChow(tile, this.getPrevPlayer(player.id)?.id),
            canWin: player.canWin(tile)
        });

        const pongBtn = document.getElementById('btn-pong');
        const kongBtn = document.getElementById('btn-kong');
        const chowBtn = document.getElementById('btn-chow');
        const winBtn = document.getElementById('btn-win');

        if (pongBtn) pongBtn.disabled = !player.canPong(tile);
        if (kongBtn) kongBtn.disabled = !player.canKong(tile, !!this.lastDraw);

        const fromPlayer = this.getPrevPlayer(player.id);
        if (chowBtn) chowBtn.disabled = !player.canChow(tile, fromPlayer?.id);

        if (winBtn) winBtn.disabled = !player.canWin(tile);
    }

    playerAction(action) {
        const player = this.players[this.currentPlayer];
        const tile = this.lastDiscard || this.lastDraw;

        Logger.log(`玩家動作: ${action}`, { player: player.name, tile: tile?.toString() });

        try {
            switch (action) {
                case 'pong':
                    this.handlePong(player, tile);
                    break;
                case 'kong':
                    this.handleKong(player, tile);
                    break;
                case 'chow':
                    this.handleChow(player, tile);
                    break;
                case 'win':
                    this.handleWin(player, tile);
                    break;
            }
        } catch (err) {
            Logger.error(`玩家動作執行失敗: ${action}`, err);
        }

        this.disableActions();
    }


    createPlayerArea(player) {
        const template = document.getElementById('tpl-player-area');
        const fragment = template.content.cloneNode(true);
        const area = fragment.querySelector('.player-area');

        area.classList.add(player.direction);
        area.querySelector('.player-name').textContent = player.name;

        return area;
    }

    updatePlayerArea(area, player) {
        const handDiv = area.querySelector('.player-hand');
        const discardsDiv = area.querySelector('.discard-pile');
        const tileTemplate = document.getElementById('tpl-tile');

        handDiv.innerHTML = '';
        player.hand.forEach(tile => {
            const fragment = tileTemplate.content.cloneNode(true);
            const tileEl = fragment.querySelector('.tile');

            if (player.isHuman) {
                tileEl.textContent = tile.toString();
                tileEl.addEventListener('click', () => {
                    this.handleHumanDiscard(tile);
                });
            } else {
                tileEl.classList.add('tile-back');
            }
            handDiv.appendChild(tileEl);
        });

        discardsDiv.innerHTML = '';
        player.discards.forEach(tile => {
            const fragment = tileTemplate.content.cloneNode(true);
            const tileEl = fragment.querySelector('.tile');
            tileEl.textContent = tile.toString();
            discardsDiv.appendChild(tileEl);
        });
    }

    handleHumanDiscard(tile) {
        if (this.state !== GameState.PLAYING) return;
        if (this.currentPlayer !== 0) return;

        const player = this.players[0];

        if (!player.hasDrawn) {
            return;
        }

        player.discardTile(tile);
        this.lastDiscard = tile;
        this.lastDraw = null;

        this.updateUI();
        this.nextPlayer();

        this.disableActions();
        this.playTurn();
    }
}

// ===========================================
// Game Class Definition only
// (Instantiation moved to app.js)
// ===========================================
