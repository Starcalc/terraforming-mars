import { expect } from "chai";
import { EquatorialMagnetizer } from "../../src/cards/EquatorialMagnetizer";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";
import { Game } from "../../src/Game";

describe("EquatorialMagnetizer", () => {
    let card: EquatorialMagnetizer, player: Player, game: Game;

    beforeEach(() => {
        card = new EquatorialMagnetizer();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act", () => {
        expect(card.canAct(player, game)).is.not.true;
    });

    it('Should act', () => {
        player.addProduction(Resources.ENERGY);
        expect(card.canAct(player, game)).is.true;

        card.action(player, game);
        expect(player.getProduction(Resources.ENERGY)).to.eq(0);
        expect(player.getTerraformRating()).to.eq(21);
    });
});
