import { expect } from "chai";
import { Miranda } from "../../src/colonies/Miranda";
import { Pets } from "../../src/cards/Pets";
import { Predators } from "../../src/cards/Predators";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { AddResourcesToCard } from "../../src/deferredActions/AddResourcesToCard";

describe("Miranda", () => {
    let miranda: Miranda, pets: Pets, player: Player, player2: Player, game: Game;

    beforeEach(() => {
        miranda = new Miranda();
        pets = new Pets();
        player = new Player("test", Color.BLUE, false);
        player2 = new Player("test2", Color.RED, false);
        game = new Game("foobar", [player, player2], player);
        game.gameOptions.coloniesExtension = true;
        game.colonies.push(miranda);
    });

    it('Should activate', () => {
        expect(miranda.isActive).is.false;
        player.playCard(game, pets);
        expect(miranda.isActive).is.true;
    });

    it('Should build', () => {
        player.playCard(game, pets);
        miranda.onColonyPlaced(player, game);

        expect(game.deferredActions).has.lengthOf(1);
        const action = game.deferredActions.shift()!;
        expect(action).to.be.an.instanceof(AddResourcesToCard);
        expect(action.player).to.eq(player);
        // Should directly add to Pets, since there's no other target
        action.execute();

        expect(pets.resourceCount).to.eq(2); // Pets starts with 1 resource
    });

    it('Should trade', () => {
        player.playCard(game, pets);
        miranda.trade(player, game);

        expect(game.deferredActions).has.lengthOf(1);
        const action = game.deferredActions.shift()!;
        expect(action).to.be.an.instanceof(AddResourcesToCard);
        expect(action.player).to.eq(player);
        // Should directly add to Pets, since there's no other target
        action.execute();

        expect(pets.resourceCount).to.eq(2);
    });

    it('Should give trade bonus', () => {
        const predators = new Predators();
        player.playCard(game, pets);
        player2.playCard(game, predators);

        miranda.onColonyPlaced(player, game);
        game.deferredActions.shift()!.execute(); // Gain placement animals

        miranda.trade(player2, game);
        game.deferredActions.shift()!.execute(); // Gain trade animals

        game.deferredActions.runAll(() => {}); // Trade bonus

        expect(pets.resourceCount).to.eq(2);
        expect(predators.resourceCount).to.eq(1);
        expect(player.cardsInHand).has.lengthOf(1);
    });
});
