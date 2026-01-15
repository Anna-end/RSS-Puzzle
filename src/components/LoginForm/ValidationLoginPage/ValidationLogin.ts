import { createUILoginPage } from '../../../pages/Login/LoginPage';
import styles from './ValidationLogin.module.css';
import { CreatorElement } from '../../../utils/element-creator';
export const arrOfDataUser: string[] = [];

//Создает страницу валидации, элементы для отображения ошибок и объявлет функцию которая вешает слушатели событий
export function createValidationLoginPage(): void {
  createUILoginPage();

  const { firstNameError, surnameError } = createErrorElements();
  setupEventListeners(firstNameError, surnameError);
}

//Собирает элементы, которые будут использоваться для слушателей событий
function setupEventListeners(firstNameError: HTMLDivElement, surnameError: HTMLDivElement): void {
  const firstNameInput = document.querySelector<HTMLInputElement>('[name="firstName"]');
  const surnameInput = document.querySelector<HTMLInputElement>('[name="surName"]');

  if (!firstNameInput || !surnameInput) {
    console.error('Could not find the input fields');
    return;
  }

  setupInputValidation(firstNameInput, surnameInput, firstNameError, surnameError);
}
// Цепляем слушатели событий
function setupInputValidation(
  firstNameInput: HTMLInputElement,
  surnameInput: HTMLInputElement,
  firstNameError: HTMLDivElement,
  surnameError: HTMLDivElement
): void {
  firstNameInput.addEventListener('blur', () => handleInputValidation('firstName'));
  firstNameInput.addEventListener('focus', () => hideErrorIfFocus(firstNameInput, firstNameError));

  surnameInput.addEventListener('blur', () => handleInputValidation('surname'));
  surnameInput.addEventListener('focus', () => hideErrorIfFocus(surnameInput, surnameError));
}

//функция, которая позволяет начать работать отдельно с разными полями инпутов
function handleInputValidation(fieldType: 'firstName' | 'surname'): void {
  validateField(fieldType);
}
//Объявляет функцию validateAndDisplayResult и передает все необходимые ей аргументы для начала валидации
function validateField(fieldType: 'firstName' | 'surname'): void {
  const firstNameInput = document.querySelector<HTMLInputElement>('[name="firstName"]');
  const surnameInput = document.querySelector<HTMLInputElement>('[name="surName"]');
  const firstNameError = document.querySelector<HTMLDivElement>('[data-error-for="firstName"]');
  const surnameError = document.querySelector<HTMLDivElement>('[data-error-for="surName"]');

  if (!firstNameInput || !surnameInput || !firstNameError || !surnameError) {
    console.error('Required elements not found for validation');
    return;
  }

  if (fieldType === 'firstName') {
    validateAndDisplayResult(firstNameInput, firstNameError, validateFirstName); //в аргументы передается инпут, ошибки и функция проверки
  } else {
    validateAndDisplayResult(surnameInput, surnameError, validateSurname); //в аргументы передается инпут, ошибки и функция проверки
  }
}
//Вытаскивает текст из инпута и проверяет его на соответсвие при помощи validationFunction,
// возвращает boolean и/или массив ошибок, после, если не верно, выдает ошибку
function validateAndDisplayResult(
  input: HTMLInputElement,
  errorElement: HTMLDivElement,
  validationFunction: (value: string) => { isValid: boolean; errors: string[] }
): void {
  const value = input.value.trim();
  const validationResult = validationFunction(value);

  if (!validationResult.isValid) {
    showError(input, errorElement, validationResult.errors);
  } else {
    hideError(input, errorElement);
  }
}

function showError(
  input: HTMLInputElement,
  errorElement: HTMLElement,
  errorMessages: string[]
): void {
  errorElement.textContent = errorMessages.join('. ');
  input.classList.add(styles.input_error);
  errorElement.classList.add(styles.error_visible);
}

function hideError(input: HTMLInputElement, errorElement: HTMLElement): void {
  errorElement.textContent = '';
  input.classList.remove(styles.input_error);
  errorElement.classList.remove(styles.error_visible);
}

function hideErrorIfFocus(input: HTMLInputElement, errorElement: HTMLElement): void {
  hideError(input, errorElement);
}

// Функция, которая вызывается в начале и добавляет созданные элементы для отображения ошибок в ДОМ
function createErrorElements(): { firstNameError: HTMLDivElement; surnameError: HTMLDivElement } {
  const firstNameContainer = document.querySelector('[container="firstName"]');
  const surnameContainer = document.querySelector('[container="surName"]');

  const firstNameError = createErrorElement('firstName');
  const surnameError = createErrorElement('surName');

  if (firstNameContainer && surnameContainer) {
    firstNameContainer.appendChild(firstNameError);
    surnameContainer.appendChild(surnameError);
  } else {
    console.error('Containers for first or last name not found');
  }

  return { firstNameError, surnameError };
}
// Создает элеметы ошибок
function createErrorElement(forAttribute: string): HTMLDivElement {
  return CreatorElement.createElement('div', {
    classes: [styles.error_popup],
    textContent: '',
    attributes: { 'data-error-for': forAttribute },
  }) as HTMLDivElement;
}

// ОСНОВНАЯ ПРОВЕРКА НА ВАЛИДАЦИЮ

function validateFirstName(value: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const nameRegex = /^[A-Z][A-Za-z-]*$/;

  if (!value) {
    errors.push('The name is required to fill in');
    return { isValid: false, errors };
  }

  if (value.length < 3) {
    errors.push('The name must contain at least 3 characters.');
  }

  if (!nameRegex.test(value)) {
    errors.push('Only English letters. The first letter is capitalized');
  }

  if (value.startsWith('-') || value.endsWith('-')) {
    errors.push('A hyphen cannot be placed at the beginning or end of a name.');
  }

  if (value.includes('--')) {
    errors.push('You cannot use two hyphens in a row.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function validateSurname(value: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const nameRegex = /^[A-Z][A-Za-z-]*$/;

  if (!value) {
    errors.push('Last name is required');
    return { isValid: false, errors };
  }

  if (value.length < 4) {
    errors.push('The last name must contain at least 4 characters.');
  }

  if (!nameRegex.test(value)) {
    errors.push('Only English letters. The first letter is capitalized');
  }

  if (value.startsWith('-') || value.endsWith('-')) {
    errors.push('A hyphen cannot be placed at the beginning or end of a surname.');
  }

  if (value.includes('--')) {
    errors.push('You cannot use two hyphens in a row.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Отдельная функция для export, чтобы проверять валидацию
export function validateAllFormFields(): boolean {
  const firstNameInput = document.querySelector<HTMLInputElement>('[name="firstName"]');
  const surnameInput = document.querySelector<HTMLInputElement>('[name="surName"]');

  if (!firstNameInput || !surnameInput) {
    return false;
  }

  const firstNameResult = validateFirstName(firstNameInput.value.trim());
  const surnameResult = validateSurname(surnameInput.value.trim());

  return firstNameResult.isValid && surnameResult.isValid;
}

// Экспортируем функции валидации
export { validateFirstName, validateSurname };
