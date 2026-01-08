import { getAllTextExamples } from '../../utils/recipient-sentence';
import {
  createBoardGameWithSentence,
  createMixWords,
} from './GameBoardСonstructor/GameBoardConstructor';
import { gameScreenUi } from '../../pages/Game/GameScreen';
import stylessStartPage from '../../pages/Start/StartPage.module.css';
import stylessGameBoard from './GameBoardСonstructor/GameBoard.module.css';
import stylessBtn from '../../components/button/continueBtn.module.css';
import { addDragDropLogic } from '../Game/DragandDrop/DragDropLogic';
import { createContinueBtn } from '../button/ContinueButton';
import { addDragDropLogicMobile } from '../Game/DragandDrop/DragDropMobile';

export function createstartGamePage() {
  const startPage = document.querySelector('[data="hidden"]');
  startPage?.classList.add(stylessStartPage.hidden);
  gameScreenUi();

  gameLogic();
}

export async function gameLogic() {
  try {
    const dataRound: string[] = await getAllTextExamples(1, 0);

    if (dataRound && dataRound.length > 0) {
      let sentence = 0;
      createBoardGameWithSentence(dataRound);
      create();
      function create() {
        createMixWords(dataRound, sentence);
        addDragDropLogic(sentence);
        addDragDropLogicMobile(sentence);
        createContinueBtn(sentence);
        check();
      }
      function check() {
        const button = document.querySelector(`[data="continueBtn-for-${sentence}"]`);
        const dataDropColor = document.querySelectorAll(`[datadrop="${sentence}"]`);
        for (const elem of dataDropColor) {
          elem.classList.add(stylessGameBoard.active);
        }
        button?.addEventListener('click', function btnEvent() {
          const sentenceBuilder = document.querySelector('[data="random"]');
          const boolen = checkSentens(dataRound, sentence);
          if (!boolen) {
            button.classList.add(stylessBtn.error);
            for (const elem of dataDropColor) {
              elem.classList.add(stylessGameBoard.error);
              setTimeout(() => {
                for (const elem of dataDropColor) {
                  elem.classList.remove(stylessGameBoard.error);
                }
              }, 500);
            }
            setTimeout(() => {
              button.classList.remove(stylessBtn.error);
            }, 500);
            return;
          }
          button.classList.add(stylessBtn.complite);
          sentence += 1;
          console.log(sentence);
          if (sentenceBuilder) {
            sentenceBuilder.innerHTML = '';
          }
          button.classList.add(stylessBtn.complite);
          button.removeEventListener('click', btnEvent);
          create();
        });
      }
    } else {
      console.error('No data received from getAllTextExamples');
    }
  } catch (error) {
    console.error('Error in gameLogic:', error);
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
