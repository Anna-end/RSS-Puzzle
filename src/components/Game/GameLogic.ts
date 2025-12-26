import styles from '../../pages/Start/satrtpage.module.css';
import { gameScreenUi } from '../../pages/Game/GameScreen';
import { createUIStartPage } from '../../pages/Start/sratrPage';
export class GameLogic {
  constructor() {
    this.startGame();
  }

  startGame() {
    const satrtPage = document.querySelector('[data="hidden"]') as HTMLElement;
    satrtPage.classList.add(styles.hidden);
    gameScreenUi();
  }
}
