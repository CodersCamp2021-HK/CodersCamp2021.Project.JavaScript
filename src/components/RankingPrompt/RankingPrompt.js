import { html } from '../../shared';
import styles from './RankingPrompt.module.css';
import charactersCelebrationUrl from '../../public/img/CharactersCelebration.png';

/**
 * @todo add close button, text field, and submit button
 *
 * @param {{ score: number }} props
 * @returns {HTMLElement}
 */
function RankingPrompt({ score }) {
  return html` <section class="${styles.mainBox}">
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
  </section>`;
}

export { RankingPrompt };
