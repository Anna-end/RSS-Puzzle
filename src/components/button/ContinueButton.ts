import { CreatorElement } from '../../utils/element-creator';
import styless from './continueBtn.module.css';

export function createContinueBtn(sentence: number) {
  const elemDataDrag = document.querySelector('[data="elem-drag"]');
  const dataDrag = elemDataDrag?.getAttribute('datadrag');
  const elemDataDrop = document.querySelector(`[datadrop="${dataDrag}"]`);
  const parentelemDataDrop = elemDataDrop?.parentElement;

  const button = CreatorElement.createElement('button', {
    classes: styless.continue_btn,
    textContent: '✓',
    attributes: {
      data: `continueBtn-for-${sentence}`,
    },
  });

  parentelemDataDrop?.append(button);
}
