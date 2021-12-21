import { html } from '../../shared';
import styles from './RulesTextBox.module.css';

/**
 * @typedef {import('../../pages/Loading').QuizCategory} QuizCategory
 */

/**
 * @typedef {import('../../pages/Loading').QuizDifficulty} QuizDifficulty
 */

/**
 * @type {Readonly<Record<QuizCategory, string>>}
 */
const categoryDescriptions = Object.freeze({
  character: 'Musisz wskazać, która postać jest przedstawiona na obrazie. Pytania jednokrotnego wyboru.',
  episode: 'Musisz wskazać postacie, które występowały w danym odcinku. Pytania wielokrotnego wyboru.',
  location: 'Musisz wskazać postacie, które znajdują się w danej lokacji. Pytania wielokrotnego wyboru.',
  mixed: 'Pytania z każdej innej kategorii.',
});

/**
 * @type {Readonly<Record<QuizDifficulty, string>>}
 */
const difficultyDescriptions = Object.freeze({
  easy: 'Dwie odpowiedzi na każde pytanie.',
  hard: 'Cztery odpowiedzi na każde pytanie.',
});

/**
 * @param {{ category?: QuizCategory, difficulty?: QuizDifficulty }?} props
 * @returns {HTMLElement}
 */
function RulesTextBox({ category, difficulty } = {}) {
  const box = html`<div class="${styles.box}">
    ${category
      ? html`<section>
          <h3>O kategorii</h3>
          <p class="${styles.boxRulesText}">${categoryDescriptions[category]}</p>
        </section>`
      : ''}
    ${difficulty
      ? html`<section>
          <h3>O poziomie trudności</h3>
          <p class="${styles.boxRulesText}">${difficultyDescriptions[difficulty]}</p>
        </section>`
      : ''}
  </div>`;
  return box;
}

export { RulesTextBox };
