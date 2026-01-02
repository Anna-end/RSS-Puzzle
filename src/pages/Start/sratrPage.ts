import { CreatorElement } from '../../utils/element-creator';
import styles from './StartPage.module.css';

export function createUIStartPage() {
  function getUserDataFromStorage() {
    try {
      const userJson = localStorage.getItem('userData');
      if (userJson) {
        return JSON.parse(userJson);
      }
      return null;
    } catch (error) {
      console.error('Ошибка при чтении из Local Storage:', error);
      return null;
    }
  }

  const userData = getUserDataFromStorage();
  const sartPageContainer = CreatorElement.createElement('div', {
    classes: [styles.start_page__container],
    attributes: {
      data: 'hidden',
    },
  });
  const startPage = CreatorElement.createElement('div', {
    classes: [styles.start_page],
  });
  const greeting = CreatorElement.createElement('h3', {
    textContent: `Hi, ${userData.firstname} ${userData.surename}`,
    classes: [styles.start_page__greeting],
  });
  const gameName = CreatorElement.createElement('h1', {
    textContent: 'English Puzzle',
    classes: [styles.start_page__title],
  });
  const gameDescription = CreatorElement.createElement('p', {
    textContent:
      'Click on words, collect phrases. World can be drag and drop. Select tooltips in the menu',
    classes: [styles.startPge__text],
  });
  const startBtn = CreatorElement.createElement('button', {
    id: 'startBtn',
    textContent: 'Start',
    classes: [styles.start_page__sartBtn],
  });
  const logoutBtn = CreatorElement.createElement('button', {
    id: 'logout',
    textContent: 'Logout',
    classes: [styles.start_page__logoutBtn],
  });

  startPage.append(greeting, gameName, gameDescription, startBtn, logoutBtn);
  sartPageContainer.append(startPage);
  document.body.append(sartPageContainer);
  return {
    startBtn,
    logoutBtn,
  };
}
