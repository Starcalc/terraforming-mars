import { expect } from "chai";
import { PhysicsComplex } from "../../src/cards/PhysicsComplex";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";

describe("PhysicsComplex", () => {
    let card: PhysicsComplex, player: Player;

    beforeEach(() => {
        card = new PhysicsComplex();
        player = new Player("test", Color.BLUE, false);
    });

    it("Can't act", () => {
        card.play();
        player.energy = 5;
        expect(card.canAct(player)).is.not.true;
    });

    it('Should act', () => {
        player.playedCards.push(card);
        player.energy = 6;
        expect(card.canAct(player)).is.true;

        card.action(player);
        expect(player.energy).to.eq(0);
        expect(card.resourceCount).to.eq(1);
    });
});
