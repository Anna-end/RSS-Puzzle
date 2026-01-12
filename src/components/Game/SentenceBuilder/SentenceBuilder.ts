import { getAllTextExamples } from '../../../utils/recipient-sentence';
import { CreatorElement } from '../../../utils/element-creator';
import styless from './sentenseBuild.module.css';

export async function pushTextExampleInDom(
  levelNumber: number,
  roundNumber: number,
  stringNumber: number
) {
  try {
    const arrData = await getAllTextExamples(levelNumber, roundNumber);
    const sentenceBuilder = document.querySelector('[data="random"]');

    if (!sentenceBuilder || !arrData.length || stringNumber >= arrData.length) {
      console.warn('Не удалось получить данные или элемент DOM');
      return;
    }

    const string = arrData[stringNumber];

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
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
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
