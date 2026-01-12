import { CreatorElement } from '../../utils/element-creator';
import styles from './satrtpage.module.css';

export function createUIStartPage() {
  const sartPageContainer = CreatorElement.createElement('div', {
    classes: [styles.start_page__container],
  });
  const startPage = CreatorElement.createElement('div', { classes: [styles.start_page] });
  const gameName = CreatorElement.createElement('h1', {
    textContent: 'English Puzzle',
    classes: [styles.start_page__title],
  });
  const gameDescription = CreatorElement.createElement('p', {
    textContent: 'Click on words',
    classes: [styles.startPge__text],
  });
  const startBtn = CreatorElement.createElement('button', {
    textContent: 'Srart',
    classes: [styles.start_page__sartBtn],
  });
  const logoutBtn = CreatorElement.createElement('button', {
    id: 'logout',
    textContent: 'Logout',
    classes: [styles.start_page__logoutBtn],
  });

  startPage.append(gameName, gameDescription, startBtn, logoutBtn);
  sartPageContainer.append(startPage);
  document.body.append(sartPageContainer);
  return {
    startBtn,
    logoutBtn,
  };
}
