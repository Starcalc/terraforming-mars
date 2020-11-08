import { expect } from "chai";
import { IceAsteroid } from "../../src/cards/IceAsteroid";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("IceAsteroid", () => {
    it('Should play', () => {
        const card = new IceAsteroid();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player, player], player);
        const action = card.play(player, game);
        expect(action).is.undefined;
    });
});
