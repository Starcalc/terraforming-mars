import { expect } from "chai";
import { Zeppelins } from "../../src/cards/Zeppelins";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("Zeppelins", () => {
    let card: Zeppelins, player: Player, game: Game;

    beforeEach(() => {
        card = new Zeppelins();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        (game as any).oxygenLevel = 4;
        expect(card.canPlay(player, game)).is.not.true;
    });
    it('Should play', () => {
        (game as any).oxygenLevel = 5;
        expect(card.canPlay(player, game)).is.true;

        const lands = game.board.getAvailableSpacesOnLand(player);
        game.addCityTile(player, lands[0].id);

        card.play(player, game);
        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
    });
});
