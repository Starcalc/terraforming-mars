import { expect } from "chai";
import { Steelworks } from "../../src/cards/Steelworks";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("Steelworks", () => {
    let card: Steelworks, player: Player, game: Game;

    beforeEach(() => {
        card = new Steelworks();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act", () => {
        player.energy = 3;
        expect(card.canAct(player, game)).is.not.true;
    });

    it('Should act', () => {
        player.energy = 4;
        expect(card.canAct(player, game)).is.true;

        card.action(player, game);
        expect(player.energy).to.eq(0);
        expect(player.steel).to.eq(2);
        expect(game.getOxygenLevel()).to.eq(1);
    });
});
