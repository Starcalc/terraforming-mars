import { expect } from "chai";
import { InterstellarColonyShip } from "../../src/cards/InterstellarColonyShip";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { GeneRepair } from "../../src/cards/GeneRepair";
import { Research } from "../../src/cards/Research";

describe("InterstellarColonyShip", () => {
    let card: InterstellarColonyShip, player: Player, game: Game;

    beforeEach(() => {
        card = new InterstellarColonyShip();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player)).is.not.true;
    });

    it('Should play', () => {
        player.playedCards.push(new Research(), new Research(), new GeneRepair());
        expect(card.canPlay(player)).is.true;

        card.play(player, game);
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(4);
    });
});
