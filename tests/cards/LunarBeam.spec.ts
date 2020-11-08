import { expect } from "chai";
import { LunarBeam } from "../../src/cards/LunarBeam";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from "../../src/Resources";

describe("LunarBeam", () => {
    let card: LunarBeam, player: Player;

    beforeEach(() => {
        card = new LunarBeam();
        player = new Player("test", Color.BLUE, false);
    });

    it('Can play', () => {
        player.addProduction(Resources.MEGACREDITS, -4);
        expect(card.canPlay(player)).is.not.true;

        player.addProduction(Resources.MEGACREDITS);
        expect(card.canPlay(player)).is.true;
    });

    it('Should play', () => {
        card.play(player);
        expect(player.getProduction(Resources.MEGACREDITS)).to.eq(-2);
        expect(player.getProduction(Resources.HEAT)).to.eq(2);
        expect(player.getProduction(Resources.ENERGY)).to.eq(2);
    });
});
