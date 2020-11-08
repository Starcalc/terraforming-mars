import { IAward } from "./IAward";
import { Player } from "../Player";
import { Game } from "../Game";

export class Benefactor implements IAward {
    public name = "Benefactor";
    public description = "Highest terraform rating";
    public getScore(player: Player, _game: Game): number {
        return player.getTerraformRating();
    }
}
