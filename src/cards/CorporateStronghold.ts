import { IProjectCard } from "./IProjectCard";
import { Game } from "../Game";
import { Player } from "../Player";
import { CardType } from "./CardType";
import { Tags } from "./Tags";
import { SelectSpace } from "../inputs/SelectSpace";
import { ISpace } from "../ISpace";
import { Resources } from "../Resources";
import { CardName } from "../CardName";

export class CorporateStronghold implements IProjectCard {
    public cost = 11;
    public cardType = CardType.AUTOMATED;
    public tags = [Tags.CITY, Tags.STEEL];
    public name = CardName.CORPORATE_STRONGHOLD;
    public hasRequirements = false;
    public canPlay(player: Player, game: Game): boolean {
        return (
            player.getProduction(Resources.ENERGY) >= 1 &&
            game.board.getAvailableSpacesForCity(player).length > 0
        );
    }
    public play(player: Player, game: Game) {
        return new SelectSpace(
            'Select space for city tile',
            game.board.getAvailableSpacesForCity(player),
            (space: ISpace) => {
                game.addCityTile(player, space.id);
                player.addProduction(Resources.ENERGY, -1);
                player.addProduction(Resources.MEGACREDITS, 3);
                return undefined;
            }
        );
    }
    public getVictoryPoints() {
        return -2;
    }
}
