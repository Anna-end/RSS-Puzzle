import { LoginFormManager } from './components/LoginForm/LoginFormManager';
import { startGame, createstartGamePage } from './components/Game/GameLogic';
const LoginForm = new LoginFormManager();
LoginForm.init();

const startPage = document.querySelector('[data="login"]') as HTMLElement;

if (startPage) {
  createstartGamePage();
} else {
  console.log('Нет страртовой страницы');
}
