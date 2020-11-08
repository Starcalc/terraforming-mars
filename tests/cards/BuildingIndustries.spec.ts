import { expect } from "chai";
import { BuildingIndustries } from "../../src/cards/BuildingIndustries";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";

describe("BuildingIndustries", () => {
    let card: BuildingIndustries, player: Player;

    beforeEach(() => {
        card = new BuildingIndustries();
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
        expect(player.getProduction(Resources.STEEL)).to.eq(2);
    });
});
