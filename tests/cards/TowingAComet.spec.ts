import { expect } from "chai";
import { TowingAComet } from "../../src/cards/TowingAComet";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("TowingAComet", () => {
    it('Should play', () => {
        const card = new TowingAComet();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player, player], player);
        card.play(player, game);
        expect(player.plants).to.eq(2);
        expect(game.getOxygenLevel()).to.eq(1);
    });
});
