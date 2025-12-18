import styles from './LoginPage.module.css';
import { CreatorElement } from '../../utils/element-creator';

export function createUILoginPage() {
  // Add container and form
  const formContainer = CreatorElement.createElement('div', {
    classes: [styles.form_container],
  });

  const userForm = CreatorElement.createElement('form', {
    classes: [styles.form],
  });

  // Add container for input and lable
  const containerForFirstName = CreatorElement.createElement('div', {
    classes: [styles.form_input_container],
  });
  const containerForSurname = CreatorElement.createElement('div', {
    classes: [styles.form_input_container],
  });

  // Add inpur lable of first name
  const userFormInputFirstName = CreatorElement.createElement('input', {
    classes: [styles.form_input],
    attributes: {
      type: 'text',
      name: 'firstName',
      placeholder: 'Enter first name',
      required: true,
    },
  });
  const lableFirstName = CreatorElement.createElement('label', {
    classes: [styles.form_lable],
    textContent: 'First Name:',
    attributes: { for: 'firstName' },
  });

  // Add inpur lable of surname
  const userFormInputSurname = CreatorElement.createElement('input', {
    classes: [styles.form_input],
    attributes: { type: 'text', name: 'surname', placeholder: 'Enter surname', required: true },
  });
  const lableSurname = CreatorElement.createElement('label', {
    classes: [styles.form_lable],
    textContent: 'Surname:',
    attributes: { for: 'surname' },
  });

  // Add button of form
  const formButton = CreatorElement.createElement('button', {
    textContent: 'Login',
    classes: [styles.form_btn],
    attributes: { type: 'submit' },
  });

  containerForFirstName.append(lableFirstName, userFormInputFirstName);
  containerForSurname.append(lableSurname, userFormInputSurname);
  userForm.append(containerForFirstName, containerForSurname, formButton);
  formContainer.appendChild(userForm);

  document.body.append(formContainer);
}
