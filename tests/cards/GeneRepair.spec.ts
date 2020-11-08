import { expect } from "chai";
import { GeneRepair } from "../../src/cards/GeneRepair";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("GeneRepair", () => {
    let card: GeneRepair, player: Player, game: Game;

    beforeEach(() => {
        card = new GeneRepair();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player)).is.not.true;
    });

    it('Should play', () => {
        player.playedCards.push(card, card, card);
        expect(card.canPlay(player)).is.true;
        card.play(player, game);

        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(2);
    });
});
