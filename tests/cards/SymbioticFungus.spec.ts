import { expect } from "chai";
import { SymbioticFungus } from "../../src/cards/SymbioticFungus";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Ants } from "../../src/cards/Ants";
import { Decomposers } from "../../src/cards/Decomposers";

describe("SymbioticFungus", () => {
    let card: SymbioticFungus, player: Player, game: Game;

    beforeEach(() => {
        card = new SymbioticFungus();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        (game as any).temperature = -14;
        expect(card.canPlay(player, game)).is.true;
    });

    it('Can act without targets', () => {
        expect(card.canAct()).is.true;
    });

    it('Should act - single target', () => {
        player.playedCards.push(new Ants());
        card.action(player, game);
        expect(player.getResourcesOnCard(player.playedCards[0])).to.eq(1);
    });

    it('Should act - multiple targets', () => {
        player.playedCards.push(new Ants(), new Decomposers());
        const action = card.action(player, game);
        expect(action).is.not.undefined;

        action!.cb([player.playedCards[0]]);
        expect(player.getResourcesOnCard(player.playedCards[0])).to.eq(1);
    });
});
