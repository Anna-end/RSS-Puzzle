import styles from './UserForm.module.css';
import { CreatorElement } from '../../utils/element-creator';

export const formContainer = CreatorElement.createElement('div', {
  classes: [styles.form_container],
});

const userForm = CreatorElement.createElement('form', {
  classes: [styles.form],
});

const containerForFirstName = CreatorElement.createElement('div', {
  classes: [styles.form_input_container],
});
const containerForSurname = CreatorElement.createElement('div', {
  classes: [styles.form_input_container],
});

const userFormInputFirstName = CreatorElement.createElement('input', {
  classes: [styles.form_input],
  attributes: { type: 'text', name: 'firstName', placeholder: 'Enter first name' },
});
const lableFirstName = CreatorElement.createElement('label', {
  classes: [styles.form_lable],
  textContent: 'First Name:',
  attributes: { for: 'firstName' },
});

const userFormInputSurname = CreatorElement.createElement('input', {
  classes: [styles.form_input],
  attributes: { type: 'text', name: 'surname', placeholder: 'Enter surname' },
});
const lableSurname = CreatorElement.createElement('label', {
  classes: [styles.form_lable],
  textContent: 'Surname:',
  attributes: { for: 'surname' },
});

const formButton = CreatorElement.createElement('button', {
  textContent: 'Login',
  classes: [styles.form_btn],
});

containerForFirstName.append(lableFirstName, userFormInputFirstName);
containerForSurname.append(lableSurname, userFormInputSurname);
userForm.append(containerForFirstName, containerForSurname, formButton);
formContainer.appendChild(userForm);
