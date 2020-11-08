import { expect } from "chai";
import { SpaceElevator } from "../../src/cards/SpaceElevator";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("SpaceElevator", () => {
    let card: SpaceElevator, player: Player, game: Game;

    beforeEach(() => {
        card = new SpaceElevator();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't act if no steel", () => {
        expect(card.canAct(player)).is.not.true;
    });

    it('Should play', () => {
        card.play(player, game);
        expect(player.getProduction(Resources.TITANIUM)).to.eq(1);
        player.victoryPointsBreakdown.setVictoryPoints('victoryPoints', card.getVictoryPoints());
        expect(player.victoryPointsBreakdown.victoryPoints).to.eq(2);
    });

    it('Should act', () => {
        player.steel = 1;
        expect(card.canAct(player)).is.true;

        card.action(player, game);
        expect(player.steel).to.eq(0);
        expect(player.megaCredits).to.eq(5);
    });
});
