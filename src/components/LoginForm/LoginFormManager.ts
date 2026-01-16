import { createUIStartPage } from '../../pages/Start/startPage';
import {
  createValidationLoginPage,
  validateAllFormFields,
} from './ValidationLoginPage/ValidationLogin';
import { setupStartHandler } from '../Game/GameLogic';

//функция, которая проверяет в main.ts есть ли юзер в локальном хранилище
export function checkUserLoginStatus(): boolean {
  const savedUser = getUserFromLocalStorage();
  return !!(savedUser && savedUser.firstname && savedUser.surename);
}

function getUserFromLocalStorage(): { firstname: string; surename: string } | null {
  try {
    const userJson = localStorage.getItem('userData');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Ошибка при чтении из Local Storage:', error);
    return null;
  }
}
// добавление обработчика событий на логаут, где мы удаляем данные из локального хранилища
// очищаем страницу и пересоздаем страницу, где нужно залогиниться
export function setupLogoutHandler(): void {
  const logoutButton = document.getElementById('logout') as HTMLElement;
  if (logoutButton) {
    logoutButton.addEventListener('click', performLogout);
  }
}

function performLogout(): void {
  localStorage.removeItem('userData');

  const container = document.body;
  container.innerHTML = '';
  createValidationLoginPage();
  setupSubmitHandler();
}

export function setupSubmitHandler(): void {
  const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
  if (!submitButton) {
    console.error('Кнопка отправки не найдена!');
    return;
  }

  submitButton.addEventListener('click', handleSubmit);
}

function handleSubmit(event: Event): void {
  event.preventDefault();

  if (validateAllFormFields()) {
    //функия из ValidationLogin.ts
    saveUserToLocalStorage();
  } else {
    console.error('Поля не прошли валидацию');
  }
}

function saveUserToLocalStorage(): void {
  const firstNameInput = document.querySelector('[name="firstName"]') as HTMLInputElement;
  const surNameInput = document.querySelector('[name="surName"]') as HTMLInputElement;

  if (!firstNameInput || !surNameInput) {
    console.error('Поля ввода не найдены');
    return;
  }

  const userData = {
    firstname: firstNameInput.value.trim(),
    surename: surNameInput.value.trim(),
  };

  if (!userData.firstname || !userData.surename) {
    console.error('Имя и фамилия обязательны для заполнения');
    return;
  }

  try {
    const userJson = JSON.stringify(userData);
    localStorage.setItem('userData', userJson);
    updateUIAfterLogin();
  } catch (error) {
    console.error('Ошибка при сохранении в Local Storage:', error);
  }
}

function updateUIAfterLogin(): void {
  const container = document.body;
  container.innerHTML = '';
  createUIStartPage();
  setupLogoutHandler();
  setupStartHandler();
}
