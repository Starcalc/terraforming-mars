import { expect } from "chai";
import { MartianRails } from "../../src/cards/MartianRails";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("MartianRails", () => {
    let card: MartianRails, player: Player, game: Game;

    beforeEach(() => {
        card = new MartianRails();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act without energy", () => {
        expect(card.play(player, game)).is.undefined;
        expect(card.canAct(player)).is.not.true;
    });

    it('Should act', () => {
        player.energy = 1;
        expect(card.canAct(player)).is.true;
        game.addCityTile(player, game.board.getAvailableSpacesOnLand(player)[0].id);

        card.action(player, game);
        expect(player.energy).to.eq(0);
        expect(player.megaCredits).to.eq(1);
    });
});
