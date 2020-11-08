import { expect } from "chai";
import { WaterSplittingPlant } from "../../src/cards/WaterSplittingPlant";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { maxOutOceans } from "../TestingUtils";

describe("WaterSplittingPlant", () => {
    let card: WaterSplittingPlant, player: Player, game: Game;

    beforeEach(() => {
        card = new WaterSplittingPlant();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Can play', () => {
        maxOutOceans(player, game, 2);
        expect(card.canPlay(player, game)).is.true;
    });

    it("Can't act", () => {
        player.energy = 2;
        expect(card.canAct(player, game)).is.not.true;
    });

    it('Should act', () => {
        player.energy = 3;
        expect(card.canAct(player, game)).is.true;

        card.action(player, game);
        expect(player.energy).to.eq(0);
        expect(game.getOxygenLevel()).to.eq(1);
    });
});
