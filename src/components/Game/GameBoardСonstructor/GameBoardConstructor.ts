import { getAllTextExamples } from '../../../utils/recipient-sentence';
import { CreatorElement } from '../../../utils/element-creator';
import styless from './GameBoard.module.css';
import { addDragDropLogic } from '../DragandDrop/DragDropLogic';

export async function pushTextExampleInField(levelNumber: number, roundNumber: number) {
  try {
    const arrData = await getAllTextExamples(levelNumber, roundNumber);

    if (!arrData.length) {
      console.warn('Не удалось получить данные или элемент DOM');
      return;
    }

    createBoardGameWithSentence(arrData);
    addDragDropLogic();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

function createBoardGameWithSentence(arrStringData: string[]) {
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
