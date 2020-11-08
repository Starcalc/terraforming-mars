import { expect } from "chai";
import { SpaceMirrors } from "../../src/cards/SpaceMirrors";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";
import { Game } from "../../src/Game";

describe("SpaceMirrors", () => {
    let card: SpaceMirrors, player: Player, game: Game;

    beforeEach(() => {
        card = new SpaceMirrors();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act", () => {
        player.megaCredits = 6;
        expect(card.canAct(player)).is.not.true;
    });

    it('Should act', () => {
        player.megaCredits = 7;
        expect(card.canAct(player)).is.true;

        card.action(player, game);
        game.deferredActions.runNext();
        expect(player.megaCredits).to.eq(0);
        expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    });
});
