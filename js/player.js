// ===========================================
// Player Module
// 玩家類別：手牌管理、吃碰槓胡判斷
// ===========================================

class Player {
    constructor(id, name, isHuman = false) {
        this.id = id;
        this.name = name;
        this.isHuman = isHuman;
        this.hand = [];
        this.melds = [];
        this.discards = [];
        this.flowers = [];
        this.isReady = false;
        this.hasDrawn = false;
    }

    drawTile(tile) {
        this.hand.push(tile);
        this.hasDrawn = true;
    }

    sortHand() {
        const order = { wan: 0, tiao: 1, tong: 2, zi: 3, hua: 4 };
        this.hand.sort((a, b) => {
            if (order[a.type] !== order[b.type]) {
                return order[a.type] - order[b.type];
            }
            return a.value - b.value;
        });
    }

    removeTile(tile) {
        const idx = this.hand.findIndex(t => t.equals(tile));
        if (idx !== -1) {
            this.hand.splice(idx, 1);
            return true;
        }
        return false;
    }

    discardTile(tile) {
        if (this.removeTile(tile)) {
            this.discards.push(tile);
            this.hasDrawn = false;
            return true;
        }
        return false;
    }

    addMelds(meld) {
        this.melds.push(meld);
    }

    getMelds() {
        return this.melds;
    }

    canPong(tile) {
        return this.hand.filter(t => t.equals(tile)).length >= 2;
    }

    canChow(tile, fromPlayer) {
        if (this.id !== fromPlayer) return false;
        
        const sorted = [...this.hand].sort((a, b) => a.value - b.value);
        for (let i = 0; i < sorted.length - 1; i++) {
            if (sorted[i].type !== tile.type) continue;
            
            const v1 = sorted[i].value;
            const v2 = sorted[i + 1].value;
            
            if ((v1 + v2 + tile.value === v1 * 3 || v1 + v2 + tile.value === v2 * 3) &&
                Math.abs(v1 - tile.value) <= 2 && Math.abs(v2 - tile.value) <= 2) {
                return true;
            }
        }
        return false;
    }

    canKong(tile, isDrawn = false) {
        const count = this.hand.filter(t => t.equals(tile)).length;
        
        if (isDrawn) {
            return count === 3;
        }
        return count === 3 || count === 4;
    }

    canWin(tile) {
        const testHand = [...this.hand];
        if (tile) {
            testHand.push(tile);
        }
        
        return this.checkWin(testHand);
    }

    checkWin(hand) {
        if (hand.length !== 14) return false;
        
        const flowers = hand.filter(t => t.isFlower());
        const nonFlowers = hand.filter(t => !t.isFlower());
        
        return this.tryWin(nonFlowers, 0, [], null);
    }

    tryWin(tiles, index, groups, eye) {
        if (index >= tiles.length) {
            return groups.length === 4 && eye !== null;
        }

        const tile = tiles[index];

        if (!eye && tiles.slice(index).filter(t => t.equals(tile)).length >= 2) {
            const remaining = tiles.filter((t, i) => i !== index && i !== index + 1);
            if (this.tryWin(remaining, 0, [...groups, { type: 'eye', tiles: [tile, tile] }], tile)) {
                return true;
            }
        }

        if (index + 2 < tiles.length &&
            tiles[index + 1].equals(tile) && tiles[index + 2].equals(tile)) {
            const remaining = tiles.filter((t, i) => i < index || i > index + 2);
            if (this.tryWin(remaining, 0, [...groups, { type: 'pong', tiles: [tile, tile, tile] }], eye)) {
                return true;
            }
        }

        if (tile.type !== TileType.ZI && tile.type !== TileType.HUA) {
            for (let i = 1; i <= 2; i++) {
                const next1 = tiles.find((t, idx) => idx > index && t.type === tile.type && t.value === tile.value + i);
                const next2 = tiles.find((t, idx) => idx > index && t.type === tile.type && t.value === tile.value + i * 2);
                
                if (next1 && next2) {
                    const remaining = tiles.filter((t, idx) => idx !== index && idx !== tiles.indexOf(next1) && idx !== tiles.indexOf(next2));
                    if (this.tryWin(remaining, 0, [...groups, { type: 'chow', tiles: [tile, next1, next2] }], eye)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    canReady() {
        const testHand = [...this.hand];
        return testHand.some(tile => {
            const copy = testHand.filter((t, i) => i !== testHand.indexOf(tile));
            return this.checkWin(copy);
        });
    }

    getHandSize() {
        return this.hand.length;
    }

    getDiscardCount() {
        return this.discards.length;
    }

    reset() {
        this.hand = [];
        this.melds = [];
        this.discards = [];
        this.flowers = [];
        this.isReady = false;
        this.hasDrawn = false;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Player };
}
