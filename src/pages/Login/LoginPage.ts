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
    },
  });
  const labelFirstName = CreatorElement.createElement('label', {
    classes: [styles.form_lable],
    textContent: 'First Name:',
    attributes: { for: 'firstName' },
  });

  // Add inpur lable of surname
  const userFormInputSurname = CreatorElement.createElement('input', {
    classes: [styles.form_input],
    attributes: {
      type: 'text',
      name: 'surname',
      placeholder: 'Enter surname',
    },
  });
  const labelSurname = CreatorElement.createElement('label', {
    classes: [styles.form_lable],
    textContent: 'Surname:',
    attributes: { for: 'surname' },
  });

  // Add button of form
  const formButton = CreatorElement.createElement('button', {
    id: 'submit-btn',
    textContent: 'Login',
    classes: [styles.form_btn],
    attributes: { type: 'submit' },
  });

  containerForFirstName.append(labelFirstName, userFormInputFirstName);
  containerForSurname.append(labelSurname, userFormInputSurname);
  userForm.append(containerForFirstName, containerForSurname, formButton);
  formContainer.appendChild(userForm);

  document.body.append(formContainer);

  return {
    formContainer,
    userForm,
    containerForFirstName,
    containerForSurname,
    userFormInputFirstName,
    userFormInputSurname,
    formButton,
  };
}
