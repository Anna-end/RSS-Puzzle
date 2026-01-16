import {
  checkUserLoginStatus,
  setupLogoutHandler,
  setupSubmitHandler,
} from './components/LoginForm/LoginFormManager';
import { createValidationLoginPage } from './components/LoginForm/ValidationLoginPage/ValidationLogin';
import { createUIStartPage } from './pages/Start/startPage';
import { setupStartHandler } from './components/Game/GameLogic';

async function initializeApp() {
  const isLoggedIn = checkUserLoginStatus();

  if (isLoggedIn) {
    createUIStartPage();
    setupLogoutHandler();
    setupStartHandler();
  } else {
    createValidationLoginPage();
    setupSubmitHandler();
  }
}

// Инициализируем приложение при загрузке
document.addEventListener('DOMContentLoaded', initializeApp);

//const LoginForm = new LoginFormManager();
//LoginForm.init();
//createGamePage();
/** 
 * Вот таким образом не работает 
 * 
  if (LoginForm.isLoggedIn()) {
   const button = LoginForm.setupLoginHandler();
   button?.addEventListener('click', async () => {
    await createstartGamePage();
  });
} 
 */
