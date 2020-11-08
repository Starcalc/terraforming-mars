import { expect } from "chai";
import { DustSeals } from "../../src/cards/DustSeals";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { maxOutOceans } from "../TestingUtils";

describe("DustSeals", () => {
    let card: DustSeals, player: Player, game: Game;

    beforeEach(() => {
        card = new DustSeals();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        maxOutOceans(player, game, 4);
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        expect(card.canPlay(player, game)).is.true;
        card.play();
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
    });
});
