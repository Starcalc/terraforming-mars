import { expect } from "chai";
import { SoilFactory } from "../../src/cards/SoilFactory";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";

describe("SoilFactory", () => {
    let card: SoilFactory, player: Player;

    beforeEach(() => {
        card = new SoilFactory();
        player = new Player("test", Color.BLUE, false);
    });

    it("Can't play", () => {
        expect(card.canPlay(player)).is.not.true;
    });

    it('Should play', () => {
        player.addProduction(Resources.ENERGY);
        expect(card.canPlay(player)).is.true;

        card.play(player);
        expect(player.getProduction(Resources.ENERGY)).to.eq(0);
        expect(player.getProduction(Resources.PLANTS)).to.eq(1);

        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(1);
    });
});
