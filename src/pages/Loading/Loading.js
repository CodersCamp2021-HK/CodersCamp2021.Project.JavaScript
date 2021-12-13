import { html } from '../../shared';
import styles from './Loading.module.css';
import portalImgUrl from '../../public/img/portal.png';
import { fetchCharacters, fetchEpisodes, fetchLocations } from '../../data/api';
import { generateQuestions } from '../../data/questions';

/**
 * @typedef {'character' | 'episode' | 'location' | 'mixed'} QuizCategory
 */

/**
 * @typedef {'easy' | 'hard'} QuizDifficulty
 */

/**
 * @typedef {Generator<import('../../data/questions').CharacterQuestion | import('../../data/questions').EpisodeOrLocationQuestion, void, unknown>} QuestionGenerator
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
 * Returns a generator of questions, that can be passed to the quiz screen.
 *
 * @param {QuizCategory} category
 * @param {QuizDifficulty} difficulty
 * @returns {Promise<QuestionGenerator>}
 */
const fetchQuestions = async (category, difficulty) => {
  const answerCount = difficulty === 'easy' ? 2 : 4;

  /**
   * Represents the amount of data pages available in the API for a given resource.
   * Current implementation of `generateQuestions` might throw on value generation
   * if even one page is missing, so this is necessary.
   *
   * @todo make `generateQuestions` able to fetch missing resources one by one
   */
  const pageCounts = Object.freeze({
    characters: 42,
    locations: 7,
    episodes: 3,
  });

  const characters = await fetchCharacters(pageCounts.characters);
  const episodes = category === 'episode' || category === 'mixed' ? await fetchEpisodes(pageCounts.episodes) : null;
  const locations = category === 'location' || category === 'mixed' ? await fetchLocations(pageCounts.locations) : null;

  return generateQuestions(answerCount, characters, episodes, locations);
};

/**
 * @param { { selectedCategory: QuizCategory, selectedDifficulty: QuizDifficulty } & import('..').RouterProps } props
 */
function Loading({ router, selectedCategory, selectedDifficulty }) {
  fetchQuestions(selectedCategory, selectedDifficulty).then((generator) => {
    router.goto({ page: 'quiz', data: { generator } });
  });

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
