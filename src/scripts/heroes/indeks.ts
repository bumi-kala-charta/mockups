const indeksRoot = document.querySelector<HTMLElement>('[data-indeks-root]');

if (indeksRoot) {
  const choices = Array.from(indeksRoot.querySelectorAll<HTMLButtonElement>('[data-indeks-choice]'));
  const atlasPanel = indeksRoot.querySelector<HTMLElement>('[data-indeks-view]');
  const copies = Array.from(indeksRoot.querySelectorAll<HTMLElement>('[data-indeks-copy]'));
  const geographies = Array.from(indeksRoot.querySelectorAll<SVGElement>('[data-indeks-geography]'));

  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const selected = choice.dataset.indeksChoice;
      if (!selected || !atlasPanel || atlasPanel.dataset.indeksView === selected) return;
      atlasPanel.dataset.indeksView = selected;
      choices.forEach((button) => button.setAttribute('aria-pressed', String(button === choice)));
      copies.forEach((copy) => { copy.hidden = copy.dataset.indeksCopy !== selected; });
      geographies.forEach((geography) => {
        geography.classList.toggle('is-visible', geography.dataset.indeksGeography === selected);
      });
    });
  });
}

export {};
