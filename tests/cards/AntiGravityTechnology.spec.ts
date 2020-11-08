import { expect } from "chai";
import { AntiGravityTechnology } from "../../src/cards/AntiGravityTechnology";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";

describe("AntiGravityTechnology", () => {
    let card: AntiGravityTechnology, player: Player;

    beforeEach(() => {
        card = new AntiGravityTechnology();
        player = new Player("test", Color.BLUE, false);
    });

    it("Can't play", () => {
        expect(card.canPlay(player)).is.not.true;
    });

    it('Should play', () => {
        player.playedCards.push(card, card, card, card, card, card, card);
        expect(card.canPlay(player)).is.true;

        card.play();
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(3);
        expect(card.getCardDiscount()).to.eq(2);
    });
});
