import { ValidationLoginPage } from './ValidationLoginPage/ValidationLogin';

export class LoginFormManager {
  private validationPage: ValidationLoginPage;
  private submitButton: HTMLButtonElement;

  constructor() {
    this.validationPage = new ValidationLoginPage();

    this.submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    this.setupSubmitHandler();
  }

  private setupSubmitHandler() {
    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.saveUserToLocalStorage();
    });
  }

  private saveUserToLocalStorage() {
    const userData = this.validationPage.getUserDataObject();
    try {
      const userJson = JSON.stringify(userData);

      localStorage.setItem('userData', userJson);
    } catch (error) {
      console.error('Ошибка при сохранении в Local Storage:', error);
      return false;
    }
  }

  public getUserFromLocalStorage() {
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
}
