import { LoginFormManager } from './components/LoginForm/LoginFormManager';
import { createGamePage } from './components/Game/GameLogic';

const LoginForm = new LoginFormManager();
LoginForm.init();
createGamePage();
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
