import { expect } from "chai";
import { WavePower } from "../../src/cards/WavePower";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";
import { maxOutOceans } from "../TestingUtils";

describe("WavePower", () => {
    let card: WavePower, player: Player, game: Game;

    beforeEach(() => {
        card = new WavePower();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        maxOutOceans(player, game, 2);
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        maxOutOceans(player, game, 3);
        expect(card.canPlay(player, game)).is.true;

        card.play(player);
        expect(player.getProduction(Resources.ENERGY)).to.eq(1);
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
    });
});
