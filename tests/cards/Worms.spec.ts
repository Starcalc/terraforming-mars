import { expect } from "chai";
import { Worms } from "../../src/cards/Worms";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("Worms", () => {
    let card: Worms, player: Player, game: Game;

    beforeEach(() => {
        card = new Worms();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        (game as any).oxygenLevel = 3;
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).oxygenLevel = 4;
        expect(card.canPlay(player, game)).is.true;
        player.playedCards.push(card);

        card.play(player);
        expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    });
});
