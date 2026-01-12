import { CreatorElement } from '../../../utils/element-creator';
import styless from './GameBoard.module.css';

export function createBoardGameWithSentence(arrStringData: string[]) {
  for (let line = 0; line <= arrStringData.length - 1; line += 1) {
    const lineTextExaple = CreatorElement.createElement('div', {
      classes: [styless.game__sentense],
    });
    const string = arrStringData[line];
    const arrWords: string[] = string.split(' ');

    for (let words = 0; words <= arrWords.length - 1; words += 1) {
      const wordTextExaple = CreatorElement.createElement('div', {
        classes: [styless.game__word],
        attributes: {
          data: 'drop',
          dataDrop: `${line}`,
        },
      });
      lineTextExaple.append(wordTextExaple);
    }
    const gameArea = document.querySelector('[data="game-field"]');
    gameArea?.append(lineTextExaple);
  }
}

export function createMixWords(arrStringData: string[], stringNumber: number) {
  const sentenceBuilder = document.querySelector('[data="random"]');

  const string = arrStringData[stringNumber];

  const arrString: string[] = string.split(' ');
  const arrShuffleWords = shuffleWordsArray(arrString);
  for (let i = 0; i <= arrShuffleWords.length - 1; i += 1) {
    const newElem: HTMLElement = CreatorElement.createElement('div', {
      textContent: arrShuffleWords[i],
      attributes: {
        draggable: 'true',
        data: 'elem-drag',
        dataDrag: `${stringNumber}`,
      },
    });
    const newContainer: HTMLElement = CreatorElement.createElement('div', {
      classes: styless.word_cng__container,
      attributes: {
        data: 'drag-container',
      },
    });
    newContainer?.append(newElem);
    sentenceBuilder?.append(newContainer);
  }
}

function shuffleWordsArray(wordsArray: string[]) {
  const shuffled = JSON.parse(JSON.stringify(wordsArray));

  if (shuffled.length <= 1) return shuffled;

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}
