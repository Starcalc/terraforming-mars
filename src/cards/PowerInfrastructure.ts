import {CardType} from './CardType';
import {IActionCard} from './ICard';
import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {Player} from '../Player';
import {Game} from '../Game';
import {SelectAmount} from '../inputs/SelectAmount';
import {CardName} from '../CardName';
import {LogHelper} from '../components/LogHelper';
import {Resources} from '../Resources';

export class PowerInfrastructure implements IActionCard, IProjectCard {
    public name = CardName.POWER_INFRASTRUCTURE;
    public cardType = CardType.ACTIVE;
    public cost = 4;
    public tags = [Tags.ENERGY, Tags.STEEL];

    public play(_player: Player, _game: Game) {
      return undefined;
    }
    public canAct(player: Player): boolean {
      return player.energy > 0;
    }
    public action(player: Player, game: Game) {
      return new SelectAmount('Select amount of energy to spend', 'Spend energy', (amount: number) => {
        player.energy -= amount;
        player.megaCredits += amount;
        LogHelper.logGainStandardResource(game, player, Resources.MEGACREDITS, amount);
        return undefined;
      }, player.energy);
    }
}
