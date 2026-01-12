export function getTranslation(arrTranslations: string[], stringNumber: number) {
  const sentenceBuilder = document.querySelector('[data="hintArea"]');

  const string = arrTranslations[stringNumber];
  const buttonTranslat = document.querySelector('[data="translation"]');
  buttonTranslat?.addEventListener('click', () => {
    if (sentenceBuilder) {
      sentenceBuilder.textContent = `Translation: ${string}`;
    }
  });
}
