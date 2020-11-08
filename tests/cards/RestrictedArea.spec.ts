import { expect } from "chai";
import { RestrictedArea } from "../../src/cards/RestrictedArea";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { TileType } from "../../src/TileType";

describe("RestrictedArea", () => {
    let card: RestrictedArea, player: Player, game: Game;

    beforeEach(() => {
        card = new RestrictedArea();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act if not enough MC", () => {
        player.megaCredits = 1;
        expect(card.canAct(player)).is.not.true;
    });

    it('Should play', () => {
        const action = card.play(player, game);
        expect(action).is.not.undefined;

        const space = action.availableSpaces[0];

        action.cb(space);
        expect(space.tile && space.tile.tileType).to.eq(TileType.RESTRICTED_AREA);
        expect(space.adjacency?.bonus).eq(undefined);
    });

    it('Should act', () => {
        player.megaCredits = 2;
        expect(card.canAct(player)).is.true;
        card.action(player, game);

        game.deferredActions.runNext();
        expect(player.megaCredits).to.eq(0);
        expect(player.cardsInHand).has.lengthOf(1);
    });
});
