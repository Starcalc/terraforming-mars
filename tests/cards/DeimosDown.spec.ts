import { expect } from "chai";
import { DeimosDown } from "../../src/cards/DeimosDown";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { OrOptions } from "../../src/inputs/OrOptions";

describe("DeimosDown", () => {
    let card: DeimosDown, player: Player, player2: Player, game: Game;

    beforeEach(() => {
        card = new DeimosDown();
        player = new Player("test", Color.BLUE, false);
        player2 = new Player("test2", Color.RED, false);
        game = new Game("foobar", [player, player2], player);
    });

    it('Should play', () => {
        player2.plants = 8;
        card.play(player, game);

        expect(game.deferredActions).has.lengthOf(1);
        const orOptions = game.deferredActions.next()!.execute() as OrOptions;
        orOptions.options[0].cb();

        expect(game.getTemperature()).to.eq(-24);
        expect(player.steel).to.eq(4);
        expect(player2.plants).to.eq(0);
    });

    it('Works fine in solo mode', () => {
        const game = new Game("foobar", [player], player);

        player.plants = 15;
        card.play(player, game);

        expect(game.getTemperature()).to.eq(-24);
        expect(player.steel).to.eq(4);
        expect(player.plants).to.eq(15); // not removed
    });
});
