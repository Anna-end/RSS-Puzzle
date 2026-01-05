import { LoginFormManager } from './components/LoginForm/LoginFormManager';
import { GameLogic } from './components/Game/GameLogic';
import { gameScreenUi } from './pages/Game/GameScreen';
import styless from './pages/Start/StartPage.module.css';
import { pushTextExampleInDom } from './components/Game/SentenceBuilder/SentenceBuilder';
import { pushTextExampleInField } from './components/Game/GameBoardСonstructor/GameBoardConstructor';

const LoginForm = new LoginFormManager();
const startButton = document.querySelector('#startBtn') as HTMLButtonElement | null;

startButton?.addEventListener('click', async () => {
  try {
    const startPage = document.querySelector('[data="hidden"]');
    startPage?.classList.add(styless.hidden);
    gameScreenUi();
    await pushTextExampleInDom(1, 0, 0);
    await pushTextExampleInField(1, 0);

    // 4. Дополнительно: отключаем кнопку на время загрузки
    startButton.disabled = true;
    setTimeout(() => {
      startButton.disabled = false;
    }, 1000);
  } catch (error) {
    console.error('Ошибка при запуске игры:', error);
    // Можно показать сообщение об ошибке пользователю
    alert('Не удалось загрузить игру. Попробуйте обновить страницу.');
  }
});
function get() {
  const dragElements = document.querySelectorAll('[data="elem-darg"]');
  const numberSentense = dragElements[0].getAttribute('datadrag');
  console.log(numberSentense);
}
