import { expect } from "chai";
import { TransNeptuneProbe } from "../../src/cards/TransNeptuneProbe";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";

describe("TransNeptuneProbe", () => {
    it('Should play', () => {
        const card = new TransNeptuneProbe();
        const player = new Player("test", Color.BLUE, false);
        const action = card.play();
        expect(action).is.undefined;
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
    });
});
