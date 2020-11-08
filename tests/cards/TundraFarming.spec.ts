import { expect } from "chai";
import { TundraFarming } from "../../src/cards/TundraFarming";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("TundraFarming", () => {
    let card: TundraFarming, player: Player, game: Game;

    beforeEach(() => {
        card = new TundraFarming();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).temperature = -6;
        expect(card.canPlay(player, game)).is.true;

        card.play(player);
        expect(player.getProduction(Resources.PLANTS)).to.eq(1);
        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
        expect(player.plants).to.eq(1);

        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(2);
    });
});
