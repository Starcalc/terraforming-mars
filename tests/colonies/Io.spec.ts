import { expect } from "chai";
import { Io } from "../../src/colonies/Io";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("Io", () => {
    let io: Io, player: Player, player2: Player, game: Game;

    beforeEach(() => {
        io = new Io();
        player = new Player("test", Color.BLUE, false);
        player2 = new Player("test2", Color.RED, false);
        game = new Game("foobar", [player, player2], player);
        game.gameOptions.coloniesExtension = true;
        game.colonies.push(io);
    });

    it('Should build', () => {
        io.onColonyPlaced(player, game);
        expect(player.getProduction(Resources.HEAT)).to.eq(1);
        expect(player2.getProduction(Resources.HEAT)).to.eq(0);
    });

    it('Should trade', () => {
        io.trade(player, game);
        expect(player.heat).to.eq(3);
        expect(player2.heat).to.eq(0);
    });

    it('Should give trade bonus', () => {
        io.onColonyPlaced(player, game);

        io.trade(player2, game);
        game.deferredActions.runAll(() => {});

        expect(player.getProduction(Resources.HEAT)).to.eq(1);
        expect(player2.getProduction(Resources.HEAT)).to.eq(0);
        expect(player.heat).to.eq(2);
        expect(player2.heat).to.eq(3);
    });
});
