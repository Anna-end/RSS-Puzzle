import { createUILoginPage } from '../LoginPageUI';
import styles from './ValidationLogin.module.css';
import { CreatorElement } from '../../../utils/element-creator';

export class ValidationLoginPage {
  private elements;
  private firstNameError: HTMLDivElement;
  private surnameError: HTMLDivElement;
  private nameRegex: RegExp;
  private firstname: string = '';
  private surename: string = '';
  constructor() {
    this.elements = createUILoginPage();
    this.nameRegex = /^[A-Z][A-Za-z-]*$/;

    this.firstNameError = this.createErrorElement('firstName');
    this.surnameError = this.createErrorElement('surname');

    this.elements.containerForFirstName.appendChild(this.firstNameError);
    this.elements.containerForSurname.appendChild(this.surnameError);

    this.setupEventListeners();
    this.getUserDataObject();
  }

  private createErrorElement(forAttribute: string): HTMLDivElement {
    return CreatorElement.createElement('div', {
      classes: [styles.error_popup],
      textContent: '',
      attributes: { 'data-error-for': forAttribute },
    }) as HTMLDivElement;
  }

  private setupEventListeners() {
    this.elements.userFormInputFirstName.addEventListener('blur', () => {
      this.handleInputValidation('firstName');
    });
    this.elements.userFormInputFirstName.addEventListener('focus', () => {
      this.hideErrorIfFocus(this.elements.userFormInputFirstName, this.firstNameError);
    });

    this.elements.userFormInputSurname.addEventListener('blur', () => {
      this.handleInputValidation('surname');
    });
    this.elements.userFormInputSurname.addEventListener('focus', () => {
      this.hideErrorIfFocus(this.elements.userFormInputSurname, this.surnameError);
    });
  }

  private handleInputValidation(fieldType: 'firstName' | 'surname') {
    this.validateField(fieldType);
  }

  private validateField(fieldType: 'firstName' | 'surname') {
    let input: HTMLInputElement;
    let errorElement: HTMLDivElement;
    let validationResult: { isValid: boolean; errors: string[] };
    let valueOfInput: string;
    if (fieldType === 'firstName') {
      input = this.elements.userFormInputFirstName;
      valueOfInput = input.value.trim();
      errorElement = this.firstNameError;
      validationResult = this.validateFirstName(valueOfInput);
      if (validationResult.isValid === true) {
        this.firstname = valueOfInput;
      }
    } else {
      input = this.elements.userFormInputSurname;
      valueOfInput = input.value.trim();
      errorElement = this.surnameError;
      validationResult = this.validateSurname(valueOfInput);
      if (validationResult.isValid === true) {
        this.surename = valueOfInput;
      }
    }

    if (!validationResult.isValid) {
      this.showError(input, errorElement, validationResult.errors);
    } else {
      this.hideError(input, errorElement);
    }
  }

  validateFirstName(value: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!value) {
      errors.push('The name is required to fill in');
      return { isValid: false, errors };
    }

    if (value.length < 3) {
      errors.push('The name must contain at least 3 characters.');
    }

    if (!this.nameRegex.test(value)) {
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

  validateSurname(value: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!value) {
      errors.push('Last name is required');
      return { isValid: false, errors };
    }

    if (value.length < 4) {
      errors.push('The last name must contain at least 4 characters.');
    }

    if (!this.nameRegex.test(value)) {
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

  showError(input: HTMLInputElement, errorElement: HTMLElement, messages: string[]) {
    errorElement.textContent = messages.join('. ');
    input.classList.add(styles.input_error);
    errorElement.classList.add(styles.error_visible);
  }

  hideError(input: HTMLInputElement, errorElement: HTMLElement) {
    errorElement.textContent = '';
    input.classList.remove(styles.input_error);
    errorElement.classList.remove(styles.error_visible);
  }

  hideErrorIfFocus(input: HTMLInputElement, errorElement: HTMLElement) {
    errorElement.textContent = '';
    input.classList.remove(styles.input_error);
    errorElement.classList.remove(styles.error_visible);
  }

  public getUserDataObject(): { firstname?: string; surename?: string } {
    const objForDataName: {
      firstname?: string;
      surename?: string;
    } = {};
    if (this.firstname) {
      objForDataName.firstname = this.firstname;
    }
    if (this.surename) {
      objForDataName.surename = this.surename;
    }
    return objForDataName;
  }
}
