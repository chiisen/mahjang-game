// ===========================================
// Scoring Module
// 台灣麻將計分系統
// ===========================================

class Scoring {
    static calculate(winner, hand, melds, isSelfDraw, isDealer, consecutiveWins, flowers) {
        let fans = 0;

        if (!this.hasMelds(melds)) {
            fans += 1;
        }

        if (isSelfDraw) {
            fans += 1;
        }

        if (isDealer) {
            fans += 1;
        }

        fans += consecutiveWins;

        const allTiles = [...hand, ...melds.flatMap(m => m.tiles)];
        
        const circles = allTiles.filter(t => 
            ['east', 'south', 'west', 'north'].includes(t.value)
        );
        if (new Set(circles.map(t => t.value)).size > 0) {
            fans += 1;
        }

        const dragons = allTiles.filter(t => 
            ['zhong', 'fa', 'bai'].includes(t.value)
        );
        if (dragons.length >= 3) {
            const dragonGroups = {};
            dragons.forEach(t => {
                if (!dragonGroups[t.value]) dragonGroups[t.value] = 0;
                dragonGroups[t.value]++;
            });
            
            for (const [dragon, count] of Object.entries(dragonGroups)) {
                if (count >= 3) {
                    fans += (count === 4) ? 2 : 1;
                }
            }
        }

        fans += flowers.length;

        return {
            fans: fans,
            points: this.fansToPoints(fans),
            details: this.getDetails(isSelfDraw, isDealer, consecutiveWins, flowers.length, !this.hasMelds(melds))
        };
    }

    static hasMelds(melds) {
        return melds && melds.length > 0;
    }

    static fansToPoints(fans) {
        if (fans <= 0) return 0;
        if (fans === 1) return 1;
        if (fans === 2) return 2;
        if (fans === 3) return 4;
        if (fans === 4) return 8;
        if (fans === 5) return 16;
        if (fans >= 6) return 32;
        
        return Math.pow(2, fans - 1);
    }

    static getDetails(isSelfDraw, isDealer, consecutiveWins, flowerCount, isPureHand) {
        const details = [];
        
        if (isPureHand) details.push('門前清 (+1)');
        if (isSelfDraw) details.push('自摸 (+1)');
        if (isDealer) details.push('莊家 (+1)');
        if (consecutiveWins > 0) details.push(`連莊 x${consecutiveWins} (+${consecutiveWins})`);
        if (flowerCount > 0) details.push(`花牌 x${flowerCount} (+${flowerCount})`);
        
        return details;
    }

    static settle(winner, losers, scores) {
        const results = [];
        
        losers.forEach(loser => {
            const points = scores.points;
            
            if (winner.isDealer || loser.isDealer) {
                results.push({
                    winner: winner.name,
                    loser: loser.name,
                    points: points * 2,
                    type: 'dealer'
                });
            } else {
                results.push({
                    winner: winner.name,
                    loser: loser.name,
                    points: points,
                    type: 'normal'
                });
            }
        });

        return results;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Scoring };
}
