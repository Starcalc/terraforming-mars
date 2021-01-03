import {SpaceBonus} from '../SpaceBonus';
import {SpaceName} from '../SpaceName';
import {Board} from './Board';
import {Player} from '../Player';
import {ISpace} from './ISpace';
import {HELLAS_BONUS_OCEAN_COST} from '../constants';
import {SpaceType} from '../SpaceType';
import {BoardBuilder} from './BoardBuilder';
import {SerializedBoard} from './SerializedBoard';

export class HellasBoard extends Board {
  private constructor(public spaces: Array<ISpace>) {
    super();
  }

  public static newInstance(shuffle: boolean, seed: number, includeVenus: boolean): HellasBoard {
    const builder = new BoardBuilder(seed, includeVenus);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const HEAT = SpaceBonus.HEAT;
    const TITANIUM = SpaceBonus.TITANIUM;
    const TWO_PLANTS = [PLANT, PLANT];

    // y=0
    builder.ocean(...TWO_PLANTS).land(...TWO_PLANTS).land(...TWO_PLANTS).land(PLANT, STEEL).land(PLANT);
    // y=1
    builder.ocean(...TWO_PLANTS).land(...TWO_PLANTS).land(PLANT, STEEL).land(PLANT).land(PLANT).land(PLANT);
    // y=2
    builder.ocean(PLANT).land(PLANT).land(STEEL).land(STEEL).land().land(...TWO_PLANTS).land(PLANT, DRAW_CARD);
    // y=3
    builder.ocean(PLANT).land(PLANT).land(STEEL).land(STEEL, STEEL).land(STEEL).ocean(PLANT).ocean(PLANT).land(PLANT);
    // y=4
    builder.land(DRAW_CARD).land().land().land(STEEL, STEEL).land().ocean(DRAW_CARD).ocean(HEAT, HEAT, HEAT).ocean().land(PLANT);
    // y=5
    builder.land(TITANIUM).land().land(STEEL).land().land().ocean().ocean(STEEL).land();
    // y=6
    builder.ocean(TITANIUM, TITANIUM).land().land().land(DRAW_CARD).land().land().land(TITANIUM);
    // y=7
    builder.land(STEEL).land(DRAW_CARD).land(HEAT, HEAT).land(HEAT, HEAT).land(TITANIUM).land(TITANIUM);
    // y=8
    builder.land().land(HEAT, HEAT).land(SpaceBonus.OCEAN).doNotShuffleLastSpace().land(HEAT, HEAT).land();

    if (shuffle) {
      builder.shuffle();
    }

    const spaces = builder.build();
    return new HellasBoard(spaces);
  }

  public static deserialize(board: SerializedBoard, players: Array<Player>): HellasBoard {
    return new HellasBoard(Board.deserializeSpaces(board.spaces, players));
  }

  private filterHellas(player: Player, spaces: Array<ISpace>) {
    return player.canAfford(HELLAS_BONUS_OCEAN_COST) ? spaces : spaces.filter((space) => space.id !== SpaceName.HELLAS_OCEAN_TILE);
  }

  public getSpaces(spaceType: SpaceType, player: Player): Array<ISpace> {
    return this.filterHellas(player, super.getSpaces(spaceType, player));
  }

  public getAvailableSpacesForCity(player: Player): Array<ISpace> {
    return this.filterHellas(player, super.getAvailableSpacesForCity(player));
  }

  public getAvailableSpacesOnLand(player: Player): Array<ISpace> {
    return this.filterHellas(player, super.getAvailableSpacesOnLand(player));
  }

  public getAvailableSpacesForGreenery(player: Player): Array<ISpace> {
    return this.filterHellas(player, super.getAvailableSpacesForGreenery(player));
  }

  public getVolcanicSpaceIds(): Array<string> {
    return [];
  }

  public getNoctisCitySpaceIds(): Array<string> {
    return [];
  }
}
