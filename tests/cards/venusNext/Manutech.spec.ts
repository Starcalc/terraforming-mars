import {expect} from 'chai';
import {Manutech} from '../../../src/cards/venusNext/Manutech';
import {Moss} from '../../../src/cards/base/Moss';
import {Color} from '../../../src/Color';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {Game} from '../../../src/Game';
import {ViralEnhancers} from '../../../src/cards/base/ViralEnhancers';
import {maxOutOceans} from '../../TestingUtils';

describe('Manutech', function() {
  let card : Manutech; let player : Player; let game : Game; let cardmoss: Moss;

  beforeEach(function() {
    card = new Manutech();
    player = new Player('test', Color.BLUE, false);
    game = new Game('foobar', [player, player], player);
    player.corporationCard = card;
  });

  it('Should play', function() {
    card.play(player);
    expect(player.getProduction(Resources.STEEL)).to.eq(1);
    expect(player.steel).to.eq(1);
  });

  it('Should add energy resources by Power Plant standard project', function() {
    const action = (player as any).buildPowerPlant(game);
    expect(action).is.not.undefined;
    action.cb();
        game.deferredActions.shift()!.execute();
        expect(player.getResource(Resources.ENERGY)).to.eq(1);
  });

  it('Should add plant using moss', function() {
    const viralEnhancers = new ViralEnhancers();
    card.play(player);
    player.playedCards.push(viralEnhancers);
    maxOutOceans(player, game, 9);
    player.addProduction(Resources.PLANTS, 7);
    player.plants = 1;
    cardmoss = new Moss();
    expect(cardmoss.canPlay(player, game)).is.true;
    cardmoss.play(player);
    console.log("Player has " + player.plants);
    console.log("Playerprod " + player.getProduction(Resources.PLANTS));
    expect(player.plants).to.eq(1);
    expect(player.getProduction(Resources.PLANTS)).to.eq(8);
  });
});
