import { getDataRound } from '../../../utils/recipient-sentence';
import { CreatorElement } from '../../../utils/element-creator';
import styless from './sentenseBuild.module.css';

async function getAllTextExamples(levelNumber: number, roundNumber: number): Promise<string[]> {
  const roundData = await getDataRound(levelNumber, roundNumber);

  if (roundData && roundData.words) {
    return roundData.words
      .map((word) => word.textExample)
      .filter((text): text is string => text !== undefined);
  }
  return [];
}

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
        classes: styless.word_cng__container,
        textContent: arrShuffleWords[i],
      });
      sentenceBuilder?.append(newElem);
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
