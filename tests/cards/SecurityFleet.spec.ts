import { expect } from "chai";
import { SecurityFleet } from "../../src/cards/SecurityFleet";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";

describe("SecurityFleet", () => {
    let card: SecurityFleet, player: Player;

    beforeEach(() => {
        card = new SecurityFleet();
        player = new Player("test", Color.BLUE, false);
    });

    it("Can't act if no titanium", () => {
        expect(card.canAct(player)).is.not.true;
    });

    it('Should act', () => {
        player.playedCards.push(card);
        player.titanium = 1;
        expect(card.canAct(player)).is.true;

        card.action(player);
        expect(player.titanium).to.eq(0);
        expect(card.resourceCount).to.eq(1);
    });
});
