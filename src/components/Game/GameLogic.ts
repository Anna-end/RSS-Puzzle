import { getAllTextExamples } from '../../utils/recipient-sentence';
import {
  createBoardGameWithSentence,
  createMixWords,
} from './GameBoardСonstructor/GameBoardConstructor';
import { gameScreenUi } from '../../pages/Game/GameScreen';
export class GameLogic {
  constructor() {
    this.startGame();
  }
}

function checkSentens(dataRound: string[], sentence: number) {
  const dataDrop = document.querySelectorAll('[data="check"]');
  const texts = Array.from(dataDrop).map((div) => {
    return div.textContent.trim();
  });

  const sameSentence =
    dataRound[sentence].split(' ').length === texts.length &&
    dataRound[sentence].split(' ').every((value, index) => value === texts[index]);

  if (sameSentence) {
    for (const elem of dataDrop) {
      elem.removeAttribute('data');
    }
  }
  const sd = dataRound[sentence].split(' ');
  console.log(texts);
  console.log(sd);
  return sameSentence;
}
