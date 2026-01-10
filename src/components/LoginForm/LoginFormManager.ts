import { ValidationLoginPage } from './ValidationLoginPage/ValidationLogin';
import { createUIStartPage } from '../../pages/Start/SratrPage';
import { closeStartPage } from '../Game/GameLogic';
export class LoginFormManager {
  private currentLogin: boolean;
  private userData: { firstname?: string; surename?: string } = {};
  buttonLogout?: HTMLElement;
  startBtn?: HTMLElement;
  constructor() {
    this.currentLogin = false;
    this.userData = {};
    this.startBtn = undefined;
    this.buttonLogout = undefined;
  }

  public init() {
    this.checkUserLoginStatus();
  }

  private checkUserLoginStatus() {
    const savedUser = this.getUserFromLocalStorage();
    if (savedUser && savedUser.firstname && savedUser.surename) {
      this.currentLogin = true;
      this.userData = savedUser;
      this.showStartPage();
    } else {
      this.currentLogin = false;
      this.showloginForm();
    }
  }

  public showloginForm(): void {
    const loginPage = new ValidationLoginPage();
    this.setupSubmitHandler(loginPage);
  }

  private setupSubmitHandler(loginPage: ValidationLoginPage): void {
    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (!submitButton) {
      console.error('Кнопка отправки не найдена!');
      return;
    }

    const newSubmitButton = submitButton.cloneNode(true) as HTMLButtonElement;
    submitButton.replaceWith(newSubmitButton);
    newSubmitButton.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.handleFormSubmit(loginPage);
    });
  }

  private handleFormSubmit(loginPage: ValidationLoginPage): void {
    const currentFormData = loginPage.getUserDataObject();

    if (!currentFormData || !currentFormData.firstname || !currentFormData.surename) {
      console.error('Неполные данные пользователя');
      return;
    }

    this.userData = currentFormData;
    const success = this.saveUserToLocalStorage();

    if (success) {
      this.currentLogin = true;
    }
  }

  private saveUserToLocalStorage(): boolean {
    try {
      if (!this.userData.firstname || !this.userData.surename) {
        console.error('Нет данных пользователя для сохранения');
        return false;
      }

      const userJson = JSON.stringify(this.userData);
      localStorage.setItem('userData', userJson);
      this.updateUIAfterLogin();

      return true;
    } catch (error) {
      console.error('Ошибка при сохранении в Local Storage:', error);
      return false;
    }
  }

  private updateUIAfterLogin(): void {
    const container = document.getElementById('app') || document.body;
    container.innerHTML = '';
    this.currentLogin = true;
    this.showStartPage();
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

  private showStartPage() {
    const { logoutBtn, startBtn } = createUIStartPage();
    this.startBtn = startBtn;
    this.buttonLogout = logoutBtn;
    this.setupLogoutHandler();
    this.setupLoginHandler();
  }
  private setupLogoutHandler() {
    if (this.buttonLogout) {
      const newButton = this.buttonLogout.cloneNode(true) as HTMLElement;
      this.buttonLogout.replaceWith(newButton);
      this.buttonLogout = newButton;
      this.buttonLogout.addEventListener('click', () => {
        this.performLogout();
      });
    }
  }

  private setupLoginHandler() {
    if (this.startBtn) {
      const newButton = this.startBtn.cloneNode(true) as HTMLElement;
      this.startBtn.replaceWith(newButton);
      this.startBtn = newButton;
      this.startBtn.addEventListener('click', async () => {
        closeStartPage();
      });
    }
  }
  public performLogout() {
    localStorage.removeItem('userData');
    this.currentLogin = false;
    this.userData = {};

    const container = document.body;
    container.innerHTML = '';

    this.showloginForm();
  }

  public isLoggedIn(): boolean {
    return this.currentLogin;
  }

  public getUserData() {
    return { ...this.userData };
  }
}
