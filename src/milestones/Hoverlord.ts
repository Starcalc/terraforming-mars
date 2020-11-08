import { IMilestone } from "./IMilestone";
import { Player } from "../Player";
import { ResourceType } from "../ResourceType";

export class Hoverlord implements IMilestone {
    public name = "Hoverlord";
    public description = "Having at least 7 floater resources on your cards";
    public getScore(player: Player): number {
        let floaterResources = 0;
        player
            .getCardsWithResources()
            .filter((card) => card.resourceType === ResourceType.FLOATER)
            .forEach((card) => {
                floaterResources += player.getResourcesOnCard(card)!;
            });
        return floaterResources;
    }
    public canClaim(player: Player): boolean {
        return this.getScore(player) >= 7;
    }
}
