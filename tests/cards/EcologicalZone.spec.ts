import { expect } from "chai";
import { EcologicalZone } from "../../src/cards/EcologicalZone";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { SelectSpace } from "../../src/inputs/SelectSpace";
import { TileType } from "../../src/TileType";

describe("EcologicalZone", () => {
    let card: EcologicalZone, player: Player, game: Game;

    beforeEach(() => {
        card = new EcologicalZone();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        const landSpace = game.board.getAvailableSpacesOnLand(player)[0];
        game.addGreenery(player, landSpace.id);
        expect(card.canPlay(player, game)).is.true;

        const action = card.play(player, game);
        expect(action instanceof SelectSpace).is.true;

        const adjacentSpace = action.availableSpaces[0];
        action.cb(adjacentSpace);
        expect(adjacentSpace.tile && adjacentSpace.tile.tileType).to.eq(TileType.ECOLOGICAL_ZONE);

        card.onCardPlayed(player, game, card);
        expect(card.resourceCount).to.eq(2);
        expect(card.getVictoryPoints()).to.eq(1);
        expect(adjacentSpace.adjacency?.bonus).eq(undefined);
    });
});
