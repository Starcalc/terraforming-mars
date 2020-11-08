import { expect } from "chai";
import { Livestock } from "../../src/cards/Livestock";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("Livestock", () => {
    let card: Livestock, player: Player, game: Game;

    beforeEach(() => {
        card = new Livestock();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play without plant production", () => {
        (game as any).oxygenLevel = 9;
        expect(card.canPlay(player, game)).is.not.true;
    });

    it("Can't play if oxygen level too low", () => {
        (game as any).oxygenLevel = 8;
        player.addProduction(Resources.PLANTS);
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        player.addProduction(Resources.PLANTS);
        (game as any).oxygenLevel = 9;
        expect(card.canPlay(player, game)).is.true;

        card.play(player);
        player.playedCards.push(card);
        expect(player.getProduction(Resources.PLANTS)).to.eq(0);
        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(2);

        player.addResourceTo(card, 4);
        expect(card.getVictoryPoints()).to.eq(4);
    });

    it('Should act', () => {
        player.playedCards.push(card);
        card.action(player);
        expect(card.resourceCount).to.eq(1);
    });
});
