import { IMilestone } from "./IMilestone";
import { Player } from "../Player";
import { Game } from "../Game";

export class Terraformer implements IMilestone {
    public name = "Terraformer";
    private terraformRating = 35;
    private terraformRatingTurmoil = 26;
    public description: string =
        'Having a terraform rating of at least ' +
        this.terraformRating +
        ' or ' +
        this.terraformRatingTurmoil +
        " with Turmoil.";
    public getScore(player: Player): number {
        return player.getTerraformRating();
    }
    public canClaim(player: Player, game: Game): boolean {
        if (game.gameOptions.turmoilExtension) {
            return this.getScore(player) >= this.terraformRatingTurmoil;
        }
        return this.getScore(player) >= this.terraformRating;
    }
}
