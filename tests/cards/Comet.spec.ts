import { expect } from "chai";
import { Comet } from "../../src/cards/Comet";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { maxOutOceans } from "../TestingUtils";
import { SelectSpace } from "../../src/inputs/SelectSpace";
import { OrOptions } from "../../src/inputs/OrOptions";

describe("Comet", () => {
    let card: Comet, player: Player, player2: Player, player3: Player, game: Game;

    beforeEach(() => {
        card = new Comet();
        player = new Player("test", Color.BLUE, false);
        player2 = new Player("test2", Color.RED, false);
        player3 = new Player("test3", Color.YELLOW, false);
        game = new Game("foobar", [player, player2, player3], player);
    });

    it('Should play', () => {
        player2.plants = 2;
        player3.plants = 4;

        card.play(player, game);
        expect(game.getTemperature()).to.eq(-28);
        expect(game.deferredActions).has.lengthOf(2);

        const selectSpace = game.deferredActions.shift()!.execute() as SelectSpace;
        selectSpace.cb(selectSpace.availableSpaces[0]);
        expect(player.getTerraformRating()).to.eq(22);

        const orOptions = game.deferredActions.shift()!.execute() as OrOptions;
        orOptions.options[0].cb();
        expect(player2.plants).to.eq(0);
    });

    it('Provides no options if there is nothing to confirm', () => {
        maxOutOceans(player, game);
        player.plants = 8;

        card.play(player, game);
        const input = game.deferredActions.next()!.execute();
        expect(input).is.undefined;

        expect(player.plants).to.eq(8); // self plants are not removed
        expect(game.getTemperature()).to.eq(-28);
    });

    it('Works fine in solo mode', () => {
        const game = new Game("solo_game", [player], player);
        player.plants = 8;

        const action = card.play(player, game);
        expect(action).is.undefined;
        expect(player.plants).to.eq(8);
    });
});
