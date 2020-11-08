import { IAward } from "./IAward";
import { Player } from "../Player";
import { Game } from "../Game";

export class Excentric implements IAward {
    public name = "Excentric";
    public description = "Most resources on cards";
    public getScore(player: Player, _game: Game): number {
        let score = 0;

        player.getCardsWithResources().forEach((card) => {
            score += player.getResourcesOnCard(card)!;
        });

        return score;
    }
}
