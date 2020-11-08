import { IAward } from "./IAward";
import { Player } from "../Player";
import { Game } from "../Game";

export class Thermalist implements IAward {
    public name = "Thermalist";
    public description = "Having the most heat resource cubes";
    public getScore(player: Player, _game: Game): number {
        return player.heat;
    }
}
