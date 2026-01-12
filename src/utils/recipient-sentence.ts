interface RoundData {
  levelData: {
    id: string;
    name: string;
    imageSrc: string;
    cutSrc: string;
    author: string;
    year: string;
  };
  words: Array<{
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
  }>;
}

export async function getDataRound(
  levelNumber: number,
  roundNumber: number
): Promise<RoundData | null> {
  const filePath = `./assets/data/wordCollectionLevel${levelNumber}.json`;
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      console.error(`Файл не найден: ${filePath}`);
      return null;
    }

    const data = await response.json();

    if (!data.rounds || !Array.isArray(data.rounds) || data.rounds.length <= roundNumber) {
      console.error(`Раунд ${roundNumber} не найден или неверная структура данных`);
      return null;
    }

    const roundData = data.rounds[roundNumber];

    if (!roundData.levelData || !roundData.words) {
      console.error('Неверная структура данных раунда');
      return null;
    }

    return roundData as RoundData;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return null;
  }
}

export async function getAllTextExamples(
  levelNumber: number,
  roundNumber: number
): Promise<string[]> {
  const roundData = await getDataRound(levelNumber, roundNumber);

  if (roundData && roundData.words) {
    return roundData.words
      .map((word) => word.textExample)
      .filter((text): text is string => text !== undefined);
  }
  return [];
}
