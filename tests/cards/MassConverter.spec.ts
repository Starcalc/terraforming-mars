import { expect } from "chai";
import { MassConverter } from "../../src/cards/MassConverter";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { TollStation } from "../../src/cards/TollStation";
import { Resources } from "../../src/Resources";

describe("MassConverter", () => {
    let card: MassConverter, player: Player, game: Game;

    beforeEach(() => {
        card = new MassConverter();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
    });

    it("Can't play", () => {
        expect(card.canPlay(player)).is.not.true;
    });

    it('Should play', () => {
        player.playedCards.push(card, card, card, card, card);
        expect(card.canPlay(player)).is.true;
        card.play(player);

        expect(player.getProduction(Resources.ENERGY)).to.eq(6);
        expect(card.getCardDiscount(player, game, card)).to.eq(0);
        expect(card.getCardDiscount(player, game, new TollStation())).to.eq(2);
    });
});
