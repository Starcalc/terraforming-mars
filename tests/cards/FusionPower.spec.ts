import { expect } from "chai";
import { FusionPower } from "../../src/cards/FusionPower";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";

describe("FusionPower", () => {
    let card: FusionPower, player: Player;

    beforeEach(() => {
        card = new FusionPower();
        player = new Player("test", Color.BLUE, false);
    });

    it("Can't play", () => {
        expect(card.canPlay(player)).is.not.true;
    });

    it('Should play', () => {
        player.playedCards.push(card, card);
        expect(card.canPlay(player)).is.true;

        card.play(player);
        expect(player.getProduction(Resources.ENERGY)).to.eq(3);
    });
});
