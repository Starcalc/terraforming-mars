import { expect } from "chai";
import { Grass } from "../../src/cards/Grass";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("Grass", () => {
    let card: Grass, player: Player, game: Game;

    beforeEach(() => {
        card = new Grass();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).temperature = -16;
        expect(card.canPlay(player, game)).is.true;
        card.play(player);

        expect(player.getProduction(Resources.PLANTS)).to.eq(1);
        expect(player.plants).to.eq(3);
    });
});
