import _ from 'lodash';

/**
 * @typedef {{category: 'character', image: string, answers: {name: string, correct: boolean}[]}} CharacterQuestion
 */

/**
 * @typedef {{category: ('episode'|'location'), name: string, answers: {name: string, image: string, correct: boolean}[]}} EpisodeOrLocationQuestion
 */

/**
 * @typedef {import('./api').ApiCharacter} ApiCharacter
 */

/**
 * @typedef {import('./api').ApiLocation} ApiLocation
 */

/**
 * @typedef {import('./api').ApiEpisode} ApiEpisode
 */

/**
 * @typedef {Generator<CharacterQuestion | EpisodeOrLocationQuestion, never, unknown>} QuestionGenerator
 */

/**
 * Generates a question from the Character category.
 * @param {number} answersNumber
 * @param {ApiCharacter[]} allCharacters
 * @returns {CharacterQuestion} question
 */
function generateCharacterQuestion(answersNumber, allCharacters) {
  const character = _.sample(allCharacters);
  /** @type {CharacterQuestion} */
  const question = {
    category: 'character',
    image: character.image,
    answers: [{ name: character.name, correct: true }],
  };
  const incorrect = _.sampleSize(
    allCharacters.filter((item) => item.id !== character.id),
    answersNumber - 1,
  );
  incorrect.forEach((item) => {
    question.answers.push({ name: item.name, correct: false });
  });

  question.answers = _.shuffle(question.answers);
  return question;
}

/**
 * Generates a multiple choice question from the Episode or Location category
 * @param {number} answersNumber
 * @param {ApiCharacter[]} allCharacters
 * @param {ApiLocation[]|ApiEpisode[]} allRecords
 * @returns {EpisodeOrLocationQuestion} question
 */
function generateEpisodeOrLocationQuestion(answersNumber, allCharacters, allRecords) {
  const record = /** @type {ApiLocation|ApiEpisode} */ (_.sample(allRecords));
  let characters;
  /** @type {'episode'|'location'} */
  let category;
  if ('characters' in record) {
    characters = record.characters;
    category = 'episode';
  } else {
    characters = record.residents;
    category = 'location';
  }
  /** @type {EpisodeOrLocationQuestion} */
  const question = { category, name: record.name, answers: [] };

  // Ensuring that there will be no more correct answers than characters in the episode/location
  // and at least one correct answer as long as the character list is not empty
  let correctAnswersNumber;
  if (characters.length === 0) correctAnswersNumber = 0;
  else {
    const maxCorrectAnswersNumber = Math.min(characters.length, answersNumber);
    correctAnswersNumber = _.random(1, maxCorrectAnswersNumber);
  }

  const correct = _.sampleSize(characters, correctAnswersNumber);
  correct.forEach((url) => {
    const id = parseInt(/[^/]+$/.exec(url)[0], 10);
    const character = allCharacters.find((item) => item.id === id);
    question.answers.push({ name: character.name, image: character.image, correct: true });
  });

  // Generating wrong answers ensuring that they do not appear in the episode/location characters list
  const incorrect = _.sampleSize(
    allCharacters.filter((item) => !characters.includes(item.url)),
    answersNumber - correctAnswersNumber,
  );
  incorrect.forEach((character) =>
    question.answers.push({ name: character.name, image: character.image, correct: false }),
  );

  question.answers = _.shuffle(question.answers);
  return question;
}

/**
 * Generates a question from random category
 * @param {number} answersNumber
 * @param {ApiCharacter[]} allCharacters
 * @param {ApiEpisode[]} allEpisodes
 * @param {ApiLocation[]} allLocations
 * @returns {CharacterQuestion|EpisodeOrLocationQuestion}
 */
function generateRandomQuestion(answersNumber, allCharacters, allEpisodes, allLocations) {
  const category = _.sample(['character', 'episode', 'location']);
  if (category === 'character') return generateCharacterQuestion(answersNumber, allCharacters);
  if (category === 'episode') return generateEpisodeOrLocationQuestion(answersNumber, allCharacters, allEpisodes);
  return generateEpisodeOrLocationQuestion(answersNumber, allCharacters, allLocations);
}

/**
 * Generates questions from one of the three categories (Character, Episode or Location) depending on the arguments passed.
 * When allRecords argument is not passed, it generates question from Characters category.
 * @param {number} answersNumber
 * @param {ApiCharacter[]} allCharacters
 * @param {ApiEpisode[]} allEpisodes
 * @param {ApiLocation[]} allLocations
 * @yields {CharacterQuestion|EpisodeOrLocationQuestion}
 * @returns {QuestionGenerator}
 */
export function* generateQuestions(answersNumber, allCharacters, allEpisodes = null, allLocations = null) {
  while (true) {
    if (allEpisodes) {
      if (allLocations) {
        yield generateRandomQuestion(answersNumber, allCharacters, allEpisodes, allLocations);
      } else {
        yield generateEpisodeOrLocationQuestion(answersNumber, allCharacters, allEpisodes);
      }
    } else if (allLocations) {
      yield generateEpisodeOrLocationQuestion(answersNumber, allCharacters, allLocations);
    } else {
      yield generateCharacterQuestion(answersNumber, allCharacters);
    }
  }
}
