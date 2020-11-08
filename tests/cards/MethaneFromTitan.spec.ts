import { expect } from "chai";
import { MethaneFromTitan } from "../../src/cards/MethaneFromTitan";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("MethaneFromTitan", () => {
    let card: MethaneFromTitan, player: Player, game: Game;

    beforeEach(() => {
        card = new MethaneFromTitan();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).oxygenLevel = 2;
        expect(card.canPlay(player, game)).is.true;
        card.play(player);

        expect(player.getProduction(Resources.HEAT)).to.eq(2);
        expect(player.getProduction(Resources.PLANTS)).to.eq(2);
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(2);
    });
});
