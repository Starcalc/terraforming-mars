import { IAward } from "./IAward";
import { Player } from "../Player";
import { Game } from "../Game";
import { Resources } from "../Resources";

export class Banker implements IAward {
    public name = "Banker";
    public description = "Having the highest MC production";
    public getScore(player: Player, _game: Game): number {
        return player.getProduction(Resources.MEGACREDITS);
    }
}
