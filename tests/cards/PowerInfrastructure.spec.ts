import { expect } from "chai";
import { PowerInfrastructure } from "../../src/cards/PowerInfrastructure";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";

describe("PowerInfrastructure", () => {
    let card: PowerInfrastructure, player: Player, game: Game;

    beforeEach(() => {
        card = new PowerInfrastructure();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act", () => {
        card.play(player, game);
        expect(card.canAct(player)).is.not.true;
    });

    it('Should act', () => {
        player.energy = 1;
        expect(card.canAct(player)).is.true;
        const action = card.action(player, game);
        action.cb(1);

        expect(player.energy).to.eq(0);
        expect(player.megaCredits).to.eq(1);
    });
});
