import { CreatorElement } from '../../utils/element-creator';
import styless from './gameScreen.module.css';

export function gameScreenUi() {
  const gameScreenContainer = CreatorElement.createElement('div', {
    classes: [styless.game__container, styless.hidden],
    attributes: {
      data: 'hidden-game',
    },
  });
  const game = CreatorElement.createElement('div', {
    classes: [styless.game],
  });
  const translation = CreatorElement.createElement('button', {
    textContent: 'Translation',
    classes: [styless.translation_btn],
    attributes: {
      data: 'translation',
    },
  });
  const gameScreenHeader = CreatorElement.createElement('header', {
    classes: [styless.game__header, styless.container],
  });
  const gameLevel = CreatorElement.createElement('select', {
    classes: [styless.game__level],
    textContent: 'level: 1',
    id: 'level',
  });
  const gameRound = CreatorElement.createElement('select', {
    classes: [styless.game__round],
    textContent: 'round: 1',
    id: 'round',
  });
  const buttonExit = CreatorElement.createElement('button', {
    classes: [styless.game__exit],
    textContent: 'Exit',
    attributes: {
      data: 'exit',
    },
  });
  const gameScreenMain = CreatorElement.createElement('main', {
    classes: [styless.main, styless.container],
  });
  const gameField = CreatorElement.createElement('div', {
    classes: [styless.game__field],
  });
  const hintArea = CreatorElement.createElement('div', {
    classes: [styless.hintArea],
    textContent: 'Translation:',
    attributes: {
      data: 'hintArea',
    },
  });
  const gameArea = CreatorElement.createElement('div', {
    classes: [styless.game__area],
    attributes: {
      data: 'game-field',
    },
  });
  const mixedWordsArea = CreatorElement.createElement('div', {
    classes: [styless.game__mixed_words_area],
    attributes: {
      data: 'random',
    },
  });
  game.append(gameScreenHeader, gameScreenMain);
  gameScreenHeader.append(translation, gameLevel, gameRound, buttonExit);
  gameField.append(gameArea, hintArea);
  gameScreenMain.append(gameField, mixedWordsArea);
  gameScreenContainer.append(game);
  document.body.append(gameScreenContainer);
}
