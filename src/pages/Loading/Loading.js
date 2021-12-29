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

const FETCH_MIN_DURATION_SECONDS = 3;

/**
 * @type {Readonly<Record<QuizCategory, String>>}
 */
const categoryDisplayNames = Object.freeze({
  character: 'bohaterowie',
  location: 'bohaterowie z lokacji',
  episode: 'bohaterowie odcinka',
  mixed: 'mieszane',
});

/**
 * @type {Readonly<Record<QuizDifficulty, String>>}
 */
const difficultyDisplayNames = Object.freeze({
  easy: 'łatwy',
  hard: 'trudny',
});

/**
 * Returns a generator of questions, that can be passed to the quiz screen.
 *
 * @param {QuizCategory} category
 * @param {QuizDifficulty} difficulty
 * @returns {Promise<import('../../data/questions').QuestionGenerator>}
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
 * Makes sure a given `promise` takes at least `seconds` to complete.
 *
 * @template T type resolved from the promise
 * @param {Promise<T>} promise
 * @param {number} seconds
 * @returns {Promise<T>} `promise` taking at least `seconds` to resolve
 */
const withMinDuration = async (promise, seconds) => {
  const sleep = new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

  const [result] = await Promise.all([promise, sleep]);

  return result;
};

/**
 * @param { { selectedCategory: QuizCategory, selectedDifficulty: QuizDifficulty } & import('..').RouterProps } props
 */
function Loading({ router, selectedCategory, selectedDifficulty }) {
  withMinDuration(fetchQuestions(selectedCategory, selectedDifficulty), FETCH_MIN_DURATION_SECONDS).then(
    (generator) => {
      router.goto({ page: 'quiz', data: { generator, selectedCategory, selectedDifficulty } });
    },
  );

  return html`<div class="${styles.wrapper}">
    <section class="${styles.column}">
      <header><h1 class="${styles.header}">Wybrałeś:</h1></header>
      <div class="${styles.info}">Kategoria: ${categoryDisplayNames[selectedCategory]}</div>
      <div class="${styles.portalWrapper}">
        <img class="${styles.portal}" src="${portalImgUrl}" alt="A portal from the show." />
        <div class="${styles.minorInfo}">ładowanie...</div>
      </div>
      <div class="${styles.info}">Poziom: ${difficultyDisplayNames[selectedDifficulty]}</div>
    </section>
  </div>`;
}

export { Loading };
