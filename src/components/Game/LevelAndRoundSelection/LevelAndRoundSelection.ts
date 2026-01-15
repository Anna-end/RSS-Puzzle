import { createGamePageLogic } from '../GameLogic';
import { CreatorElement } from '../../../utils/element-creator';
import styles from './SelectionsLevel.module.css';

export function createSelectLevel() {
  const containerLevel = document.getElementById('level') as HTMLSelectElement;

  if (!containerLevel) {
    console.error('Element with id "level" not found');
    return;
  }

  containerLevel.innerHTML = '';

  for (let level = 1; level <= 6; level += 1) {
    const option = CreatorElement.createElement('option', {
      classes: styles.option,
      textContent: `Level ${level}`,
      attributes: {
        value: level.toString(),
      },
    });
    containerLevel.appendChild(option);
  }
}

export async function createSelectRound(): Promise<void> {
  const containerRound = document.getElementById('round') as HTMLSelectElement;
  const containerLevel = document.getElementById('level') as HTMLSelectElement;

  if (!containerRound || !containerLevel) {
    console.error('Required elements not found: #round or #level');
    return;
  }

  const numLevel: number = parseInt(containerLevel.value) || 1;

  const filePath = `./assets/data/wordCollectionLevel${numLevel}.json`;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Файл не найден: ${filePath}. Status: ${response.status}`);
    }

    const data = await response.json();
    const rounds: string[] = data.rounds || [];

    containerRound.innerHTML = '';

    rounds.forEach((_, index) => {
      const roundNumber = index + 1;
      const option = CreatorElement.createElement('option', {
        classes: styles.option,
        textContent: `Round ${roundNumber}`,
        attributes: {
          value: index,
        },
      });
      containerRound.appendChild(option);
    });
  } catch (error) {
    console.error('Ошибка загрузки раундов:', error);
  }
}

export async function initSelectors() {
  createSelectLevel();

  await createSelectRound();

  setupEventListenersForLevel();
  setupEventListenersForRound();
}

function setupEventListenersForLevel() {
  const containerLevel = document.getElementById('level') as HTMLSelectElement;
  const containerRound = document.getElementById('round') as HTMLSelectElement;

  if (!containerLevel || !containerRound) {
    console.error('Select elements not found for event listeners');
    return;
  }

  containerLevel.addEventListener('change', async () => {
    await createSelectRound();

    const numLevel = parseInt(containerLevel.value);
    const numRound = parseInt(containerRound.value);
    resetGameAndStart(numLevel, numRound);
  });
}

function setupEventListenersForRound() {
  const containerRound = document.getElementById('round') as HTMLSelectElement;

  if (!containerRound) {
    console.error('Select elements not found for event listeners');
    return;
  }

  containerRound.addEventListener('change', function () {
    const containerLevel = document.getElementById('level') as HTMLSelectElement;
    const numLevel: number = parseInt(containerLevel.value);
    const numRound = parseInt(this.value);
    resetGameAndStart(numLevel, numRound);
  });
}

function resetGameAndStart(numLevel: number, numRound: number) {
  const gameArea = document.querySelector('[data="game-field"]');
  if (gameArea) {
    gameArea.innerHTML = '';
  }

  const sentenceBuilder = document.querySelector('[data="random"]');
  if (sentenceBuilder) {
    sentenceBuilder.innerHTML = '';
  }

  createGamePageLogic(numLevel, numRound);
}
