import { LoginFormManager } from './components/LoginForm/LoginFormManager';
import { createstartGamePage, gameLogic } from './components/Game/GameLogic';

const LoginForm = new LoginFormManager();
const startButton = document.querySelector('#startBtn') as HTMLButtonElement | null;

startButton?.addEventListener('click', createstartGamePage);
gameLogic();
