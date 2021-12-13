import { html } from '../../shared';
import styles from './Loading.module.css';
import portalImgUrl from '../../public/img/portal.png';

/**
 * @typedef {'character' | 'episode' | 'location' | 'mixed'} QuizCategory
 */

/**
 * @typedef {'easy' | 'hard'} QuizDifficulty
 */

/**
 * @param {QuizCategory} category
 * @returns {string}
 */
const categoryDisplayName = (category) => {
  switch (category) {
    case 'character':
      return 'bohaterowie';
    case 'location':
      return 'bohaterowie z lokacji';
    case 'episode':
      return 'bohaterowie odcinka';
    default:
      return '';
  }
};

/**
 * @param {QuizDifficulty} difficulty
 * @returns {string}
 */
const difficultyDisplayName = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'łatwy';
    case 'hard':
      return 'trudny';
    default:
      return '';
  }
};

/**
 * @param { { selectedCategory: QuizCategory, selectedDifficulty: QuizDifficulty } & import('..').RouterProps } props
 */
function Loading({ selectedCategory, selectedDifficulty }) {
  return html`<div class="${styles.wrapper}">
    <section class="${styles.column}">
      <header><h1 class="${styles.header}">Wybrałeś:</h1></header>
      <div class="${styles.info}">Kategoria: ${categoryDisplayName(selectedCategory)}</div>
      <div class="${styles.portalWrapper}">
        <img class="${styles.portal}" src="${portalImgUrl}" alt="A portal from the show." />
        <div class="${styles.minorInfo}">ładowanie...</div>
      </div>
      <div class="${styles.info}">Poziom: ${difficultyDisplayName(selectedDifficulty)}</div>
    </section>
  </div>`;
}

export { Loading };
