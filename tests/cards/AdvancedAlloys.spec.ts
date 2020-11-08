import { expect } from "chai";
import { AdvancedAlloys } from "../../src/cards/AdvancedAlloys";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("AdvancedAlloys", () => {
    it('Should play', () => {
        const card = new AdvancedAlloys();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player, player], player);
        card.play(player);
        expect(player.getTitaniumValue(game)).to.eq(4);
        expect(player.steelValue).to.eq(3);
    });
});
