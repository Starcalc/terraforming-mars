import { expect } from "chai";
import { GreatDam } from "../../src/cards/GreatDam";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";
import { maxOutOceans } from "../TestingUtils";

describe("GreatDam", () => {
    let card: GreatDam, player: Player, game: Game;

    beforeEach(() => {
        card = new GreatDam();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        maxOutOceans(player, game, 4);
        expect(card.canPlay(player, game)).is.true;
        card.play(player);

        expect(player.getProduction(Resources.ENERGY)).to.eq(2);
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
    });
});
