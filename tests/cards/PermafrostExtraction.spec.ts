import { expect } from "chai";
import { PermafrostExtraction } from "../../src/cards/PermafrostExtraction";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("PermafrostExtraction", () => {
    let card: PermafrostExtraction, player: Player, game: Game;

    beforeEach(() => {
        card = new PermafrostExtraction();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).temperature = -8;
        expect(card.canPlay(player, game)).is.true;

        const action = card.play(player, game);
        action!.cb(action!.availableSpaces[0]);
        expect(game.board.getOceansOnBoard()).to.eq(1);
    });
});
