import {
  //Получение данных из public/assets/data
  getAllTextExamplesInEnglish,
  getAllTextExamplesTranslations,
} from '../../utils/recipient-sentence';
//Функции с логикой для создания игрового поля и перемешивания предложения, которое предстоит собрать
import {
  createBoardGameWithSentence,
  createMixWords,
} from './GameBoardСonstructor/GameBoardConstructor';
import { gameScreenUi } from '../../pages/Game/GameScreen';
import { createContinueBtn } from '../button/ContinueButton'; // кнопка на которую вешается логика проверки составленных предложений

import { addDragDropLogic } from '../Game/DragandDrop/DragDropLogic';
import { addDragDropLogicMobile } from '../Game/DragandDrop/DragDropMobile';

import { initSelectors } from './LevelAndRoundSelection/LevelAndRoundSelection'; //выбор уровней и раунов
import { getTranslation } from '../Game/Hint/translationLogic';

import stylessStartPage from '../../pages/Start/StartPage.module.css';
import stylessGameBoard from './GameBoardСonstructor/GameBoard.module.css';
import stylessBtn from '../../components/button/continueBtn.module.css';
import stylessGamePage from '../../pages/Game/GameScreen.module.css';

export function hideStartPage(): void {
  const startPage = document.querySelector('[data="login"]');
  startPage?.classList.add(stylessStartPage.hidden);
}

export function showStartPage(): void {
  const startPage = document.querySelector('[data="login"]');
  startPage?.classList.remove(stylessStartPage.hidden);
}

function hideGamePage(): void {
  const gamePageElement = document.querySelector('[data="hidden-game"]');
  if (gamePageElement) {
    gamePageElement.classList.add(stylessGamePage.hidden);
  }
}

function showGamePage(): void {
  const gamePageElement = document.querySelector('[data="hidden-game"]');
  if (gamePageElement) {
    gamePageElement.classList.remove(stylessGamePage.hidden);
  }
}

//Обработчик событий на кнопку старт
export function setupStartHandler(): void {
  const startButton = document.getElementById('startBtn');

  if (startButton) {
    startButton.addEventListener('click', handleFirstStartClick);
  } else {
    console.error('Кнопка Start не найдена');
  }
}

async function handleFirstStartClick(event: Event): Promise<void> {
  event.preventDefault();

  try {
    // Инициализируем игру при первом клике
    await createGamePage();

    // Скрываем стартовую страницу
    hideStartPage();

    // Показываем игровую страницу
    showGamePage();

    // Удаляем старый обработчик и добавляем новый
    const startButton = document.getElementById('startBtn');
    if (startButton) {
      startButton.removeEventListener('click', handleFirstStartClick);
      startButton.addEventListener('click', handleSubsequentStartClicks);
    }
  } catch (error) {
    console.error('Ошибка при инициализации игры:', error);
  }
}

function handleSubsequentStartClicks(event: Event): void {
  event.preventDefault();

  // Просто переключаем видимость страниц, без того, чтобы пересоздавать все заново
  hideStartPage();
  showGamePage();
}

// Создаем игровую страницу
export async function createGamePage() {
  try {
    gameScreenUi(); // Создаем UI игровой страницы
    await createGamePageLogic(1, 0); // Запускаем игру с начальными параметрами
    await initSelectors(); // Инициализируем селекторы уровней
    backStartPage(); // Настраиваем кнопку возврата на стартовую страницу
  } catch (error) {
    console.error('Ошибка при создании игровой страницы:', error);
  }
}

export async function createGamePageLogic(numLevel: number, numRound: number) {
  try {
    const dataRound: string[] = await getAllTextExamplesInEnglish(numLevel, numRound);
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
        checkElementDrop();
      }

      function checkElementDrop() {
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
    return div.textContent?.trim() || '';
  });

  const words = dataRound[sentence].split(' ');
  const sameSentence =
    words.length === texts.length && words.every((value, index) => value === texts[index]);

  if (sameSentence) {
    for (const elem of dataDrop) {
      elem.removeAttribute('data');
    }
  }

  console.log('Проверка предложения:', texts);
  console.log('Оригинальное предложение:', words);

  return sameSentence;
}

function backStartPage() {
  const exitBtn = document.querySelector('[data="exit"]');
  exitBtn?.addEventListener('click', () => {
    hideGamePage();
    showStartPage();
  });
}
