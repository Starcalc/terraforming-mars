import { expect } from "chai";
import { Decomposers } from "../../src/cards/Decomposers";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Algae } from "../../src/cards/Algae";
import { Birds } from "../../src/cards/Birds";

describe("Decomposers", () => {
    let card: Decomposers, player: Player, game: Game;

    beforeEach(() => {
        card = new Decomposers();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).oxygenLevel = 3;
        expect(card.canPlay(player, game)).is.true;
        card.play();

        card.onCardPlayed(player, game, new Birds());
        expect(card.resourceCount).to.eq(1);
        card.onCardPlayed(player, game, card);
        expect(card.resourceCount).to.eq(2);
        card.onCardPlayed(player, game, new Algae());

        expect(card.resourceCount).to.eq(3);
        expect(card.getVictoryPoints()).to.eq(1);
    });
});
