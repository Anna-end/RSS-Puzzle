import { CreatorElement } from '../../utils/element-creator';
import styless from './gameScreen.module.css';

export function gameScreenUi() {
  const gameScreenContainer = CreatorElement.createElement('div', {
    classes: [styless.game],
  });
  const gameScreenHeader = CreatorElement.createElement('header', {
    classes: [styless.game__header, styless.container],
  });
  const gameScreenMain = CreatorElement.createElement('main', {
    classes: [styless.main, styless.container],
  });
  const gameField = CreatorElement.createElement('div', {
    classes: [styless.game__field],
  });
  const gameArea = CreatorElement.createElement('div', {
    classes: [styless.game__area],
  });
  const sentenceBuilder = CreatorElement.createElement('div', {
    classes: [styless.game__sentence_builder],
  });

  gameField.append(gameArea);
  gameScreenMain.append(gameField, sentenceBuilder);
  gameScreenContainer.append(gameScreenHeader, gameScreenMain);
  document.body.append(gameScreenContainer);
}
