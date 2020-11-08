import { expect } from "chai";
import { SpecialDesign } from "../../src/cards/SpecialDesign";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("SpecialDesign", () => {
    it('Should play', () => {
        const card = new SpecialDesign();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player, player], player);
        const action = card.play();
        expect(action).is.undefined;
        expect(card.getRequirementBonus(player, game)).to.eq(0);
    });
});
