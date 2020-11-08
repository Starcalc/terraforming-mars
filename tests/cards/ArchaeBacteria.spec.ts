import { expect } from "chai";
import { ArchaeBacteria } from "../../src/cards/ArchaeBacteria";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { Resources } from "../../src/Resources";

describe("ArchaeBacteria", () => {
    let card: ArchaeBacteria, player: Player, game: Game;

    beforeEach(() => {
        card = new ArchaeBacteria();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        (game as any).temperature = -12;
        expect(card.canPlay(player, game)).is.not.true;
    });

    it('Should play', () => {
        card.play(player);
        expect(player.getProduction(Resources.PLANTS)).to.eq(1);
    });
});
