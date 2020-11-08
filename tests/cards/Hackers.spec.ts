import { expect } from "chai";
import { Hackers } from "../../src/cards/Hackers";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";

describe("Hackers", () => {
    let card: Hackers, player: Player;

    beforeEach(() => {
        card = new Hackers();
        player = new Player("test", Color.BLUE, false);
    });

    it("Can't play", () => {
        expect(card.canPlay(player)).is.not.true;
    });

    it('Should play', () => {
        player.addProduction(Resources.ENERGY);
        expect(card.canPlay(player)).is.true;
    });
});
