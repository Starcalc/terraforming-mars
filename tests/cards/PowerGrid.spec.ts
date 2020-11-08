import { expect } from "chai";
import { PowerGrid } from "../../src/cards/PowerGrid";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";

describe("PowerGrid", () => {
    it('Should play', () => {
        const card = new PowerGrid();
        const player = new Player("test", Color.BLUE, false);
        const action = card.play(player);
        expect(action).is.undefined;
        expect(player.getProduction(Resources.ENERGY)).to.eq(1);
        player.playedCards.push(card);
        card.play(player);
        expect(player.getProduction(Resources.ENERGY)).to.eq(3);
    });
});
