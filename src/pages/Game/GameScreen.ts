import { CreatorElement } from '../../utils/element-creator';
import styless from './gameScreen.module.css';

export function gameScreenUi() {
  const gameScreenContainer = CreatorElement.createElement('div', {
    classes: [styless.game__container],
  });
  const game = CreatorElement.createElement('div', {
    classes: [styless.game],
  });
  const gameScreenHeader = CreatorElement.createElement('header', {
    classes: [styless.game__header, styless.container],
  });
  const gameLevel = CreatorElement.createElement('div', {
    classes: [styless.game__level],
    textContent: 'level: 1',
  });
  const gameRound = CreatorElement.createElement('div', {
    classes: [styless.game__round],
    textContent: 'round: 1',
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
  const mixedWordsArea = CreatorElement.createElement('div', {
    classes: [styless.game__mixed_words_area],
    attributes: {
      data: 'random',
    },
  });
  game.append(gameScreenHeader, gameScreenMain);
  gameScreenHeader.append(gameLevel, gameRound);
  gameField.append(gameArea);
  gameScreenMain.append(gameField, mixedWordsArea);
  gameScreenContainer.append(game);
  document.body.append(gameScreenContainer);
}
