import { getAllTextExamples, getAllTextExamplesTranslations } from '../../utils/recipient-sentence';
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
import { initSelectors } from './LevelAndRoundSelection/LevelAndRoundSelection';
import stylessGamePage from '../../pages/Game/GameScreen.module.css';
import { getTranslation } from '../Game/Hint/translationLogic';

export async function closeStartPage() {
  const startPage = document.querySelector('[data="login"]');
  startPage?.classList.add(stylessStartPage.hidden);
  const gamePage = document.querySelector('[data="hidden-game"]');
  if (gamePage) {
    gamePage.className = stylessGamePage.game__container;
  }
}

export async function createGamePage() {
  gameScreenUi();
  startGame(1, 0);
  await initSelectors();
  backStartPage();
}

export async function startGame(numLevel: number, numRound: number) {
  try {
    const dataRound: string[] = await getAllTextExamples(numLevel, numRound);
    const arrTranslations = await getAllTextExamplesTranslations(numLevel, numRound);
    if (dataRound && dataRound.length > 0) {
      let sentence = 0;
      createBoardGameWithSentence(dataRound);
      createGameLogicForRound();
      function createGameLogicForRound() {
        createMixWords(dataRound, sentence);
        addDragDropLogic(sentence);
        console.log(arrTranslations[0]);
        addDragDropLogicMobile(sentence);
        createContinueBtn(sentence);
        getTranslation(arrTranslations, sentence);
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
          const sentenceTranslation = document.querySelector('[data="hintArea"]');
          if (sentenceTranslation) {
            sentenceTranslation.textContent = '';
          }
          console.log(sentence);
          if (sentenceBuilder) {
            sentenceBuilder.innerHTML = '';
          }
          button.classList.add(stylessBtn.complite);
          button.removeEventListener('click', btnEvent);
          createGameLogicForRound();
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

function backStartPage() {
  const exitBtn = document.querySelector('[data="exit"]');
  exitBtn?.addEventListener('click', () => {
    const startPage = document.querySelector('[data="login"]');
    startPage?.classList.remove(stylessStartPage.hidden);
    const gamePage = document.querySelector('[data="hidden-game"]');
    gamePage?.classList.add(stylessGamePage.hidden);
  });
}
