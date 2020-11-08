import { IMilestone } from "./IMilestone";
import { Player } from "../Player";
import { Tags } from "../cards/Tags";

export class Ecologist implements IMilestone {
    public name = "Ecologist";
    public description =
        'Requires that you have 4 bio tags (plant, microbe and animal tags count as bio tags)';
    public getScore(player: Player): number {
        const tags: Array<Tags> = [Tags.PLANT, Tags.ANIMAL, Tags.MICROBES];
        return player.getMultipleTagCount(tags);
    }
    public canClaim(player: Player): boolean {
        return this.getScore(player) >= 4;
    }
}
