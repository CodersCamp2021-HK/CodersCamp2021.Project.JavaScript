import { html } from '../../shared';
import styles from './RankingPrompt.module.css';
import rickAndMortyLogoUrl from '../../images/RickAndMortyLogo.png';
import charactersCelebrationUrl from '../../public/img/charactersCelebration.png';

/**
 * @param {{ score: number } & import('..').RouterProps} props
 * @returns
 */
function RankingPrompt({ score }) {
  return html`<div class="${styles.wrapper}">
    <main class="${styles.mainBox}">
      <img class="${styles.image}" src="${charactersCelebrationUrl}" alt="Characters from the show dancing." />
      <div class=${styles.column}>
        <header>
          <h3 class="${styles.heading}">Gratulacje!</h3>
          <p>Twój wynik to ${score} pkt.</p>
        </header>
        <section>
          <label class="${styles.questionText}">Wpisz swój nick:</label>
        </section>
      </div>
      <div class="${styles.logoWrapper}">
        <img class="${styles.logo}" src="${rickAndMortyLogoUrl}" alt="Rick and Morty logo." />
      </div>
    </main>
  </div>`;
}

export { RankingPrompt };
