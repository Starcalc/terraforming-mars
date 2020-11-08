import { expect } from "chai";
import { SearchForLife } from "../../src/cards/SearchForLife";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Tags } from "../../src/cards/Tags";

describe("SearchForLife", () => {
    let card: SearchForLife, player: Player, game: Game;

    beforeEach(() => {
        card = new SearchForLife();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act if no MC", () => {
        expect(card.canAct(player)).is.not.true;
    });

    it("Can't play if oxygen level too high", () => {
        (game as any).oxygenLevel = 7;
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).oxygenLevel = 6;
        expect(card.canPlay(player, game)).is.true;
        player.playedCards.push(card);
        card.play();

        expect(card.getVictoryPoints()).to.eq(0);
        player.addResourceTo(card);
        expect(card.getVictoryPoints()).to.eq(3);
    });

    it('Should act', () => {
        player.playedCards.push(card);

        while (
            game.dealer.discarded.find(
                (c) => c.tags.length === 1 && c.tags[0] === Tags.MICROBES
            ) === undefined ||
            game.dealer.discarded.find(
                (c) => c.tags.length === 1 && c.tags[0] !== Tags.MICROBES
            ) === undefined
        ) {
            player.megaCredits = 1;
            card.action(player, game);
            game.deferredActions.runNext();
            expect(player.megaCredits).to.eq(0);
        }

        expect(card.resourceCount >= 1).is.true;
    });
});
