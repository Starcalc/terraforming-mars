import { expect } from "chai";
import { UndergroundDetonations } from "../../src/cards/UndergroundDetonations";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("UndergroundDetonations", () => {
    let card: UndergroundDetonations, player: Player, game: Game;

    beforeEach(() => {
        card = new UndergroundDetonations();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act", () => {
        player.megaCredits = 9;
        expect(card.canAct(player)).is.not.true;
    });

    it('Should act', () => {
        player.megaCredits = 10;
        expect(card.canAct(player)).is.true;

        card.action(player, game);
        game.deferredActions.runNext();
        expect(player.megaCredits).to.eq(0);
        expect(player.getProduction(Resources.HEAT)).to.eq(2);
    });
});
