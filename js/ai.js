// ===========================================
// AI Module
// AI 電腦玩家決策邏輯
// ===========================================

class AIPlayer extends Player {
    constructor(id, name) {
        super(id, name, false);
    }

    decide(tile, game) {
        if (this.canWin(tile)) {
            return { action: 'win', tile: tile };
        }

        if (this.canKong(tile, false)) {
            if (Math.random() > 0.3) {
                return { action: 'kong', tile: tile };
            }
        }

        if (this.canPong(tile)) {
            if (Math.random() > 0.5) {
                return { action: 'pong', tile: tile };
            }
        }

        if (tile && this.canChow(tile, game.getPrevPlayer(this.id))) {
            if (Math.random() > 0.5) {
                return { action: 'chow', tile: tile };
            }
        }

        return { action: 'discard', tile: this.chooseDiscard() };
    }

    chooseDiscard() {
        this.sortHand();
        
        const ziTiles = this.hand.filter(t => t.type === TileType.ZI);
        if (ziTiles.length > 0) {
            return ziTiles[0];
        }

        const counts = {};
        this.hand.forEach(t => {
            const key = `${t.type}-${t.value}`;
            counts[key] = (counts[key] || 0) + 1;
        });

        let lonelyTile = null;
        let minCount = 999;
        
        for (const tile of this.hand) {
            const key = `${tile.type}-${tile.value}`;
            if (counts[key] < minCount) {
                minCount = counts[key];
                lonelyTile = tile;
            }
        }

        return lonelyTile || this.hand[0];
    }

    decideAfterDraw(tile) {
        this.drawTile(tile);
        this.sortHand();

        if (this.canWin(tile)) {
            return { action: 'win', tile: tile };
        }

        if (this.canKong(tile, true)) {
            return { action: 'kong', tile: tile };
        }

        return { action: 'discard', tile: this.chooseDiscard() };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIPlayer };
}
