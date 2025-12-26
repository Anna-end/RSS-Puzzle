import { CreatorElement } from '../../utils/element-creator';
import styless from './gameScreen.module.css';

export function gameScreenUi() {
  const gameScreenContainer = CreatorElement.createElement('div');
  const gameScreenHeader = CreatorElement.createElement('header');
  const gameScreenMain = CreatorElement.createElement('main');

  gameScreenContainer.append(gameScreenHeader, gameScreenMain);
  document.body.append(gameScreenContainer);
}
