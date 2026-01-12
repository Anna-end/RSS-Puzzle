import { LoginFormManager } from './components/LoginForm/LoginFormManager';
import { GameLogic } from './components/Game/GameLogic';
import { gameScreenUi } from './pages/Game/GameScreen';
import styless from './pages/Start/satrtpage.module.css';
const LoginForm = new LoginFormManager();

const startButton = document.querySelector('#startBtn');

startButton?.addEventListener('click', () => {
  const startPage = document.querySelector('[data="hidden"]');
  startPage?.classList.add(styless.hidden);
  gameScreenUi();
});
