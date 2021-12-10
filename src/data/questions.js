import _ from 'lodash';

/**
 * @typedef {{image: string, answers: {name: string, correct: boolean}[]}} CharacterQuestion
 */

/**
 * @typedef {{name: string, answers: {name: string, image: string, correct: boolean}[]}} EpisodeOrLocationQuestion
 */

/**
 * @typedef {{
 *  id: number,
 *  name: string,
 *  url: string,
 *  created: string,
 * }} ApiEntry
 */

/**
 * @typedef {ApiEntry & {
 *   status: 'Alive' | 'Dead' | 'unknown',
 *   species: string,
 *   type: string,
 *   gender: 'Female' | 'Male' | 'Genderless' | 'unknown',
 *   origin: { name: string, url: string },
 *   location: { name: string, url: string },
 *   image: string,
 *   episode: string[],
 * }} ApiCharacter
 */

/**
 * @typedef {ApiEntry & {
 *  type: string,
 *  dimension: string,
 *  residents: string[],
 * }} ApiLocation
 */

/**
 * @typedef {ApiEntry & {
 *  air_date: string,
 *  episode: string,
 *  characters: string[],
 * }} ApiEpisode
 */

/**
 * Generates a question from the Character category.
 * @param {number} answersNumber
 * @param {ApiCharacter[]} allCharacters
 * @returns {CharacterQuestion} question
 */
function generateCharacterQuestion(answersNumber, allCharacters) {
  const character = _.sample(allCharacters);
  const question = { image: character.image, answers: [{ name: character.name, correct: true }] };
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
  const record = _.sample(allRecords);
  // `characters` for Episode, `residents` for Location data
  // @ts-ignore
  const characters = record.characters ?? record.residents;
  // @ts-ignore
  const question = { name: record.name, answers: [] };

  // Ensuring that there will be no more correct answers than characters in the episode/location
  // and at least one correct answer as long as the character list is not empty
  let correctAnswersNumber;
  if (characters.length === 0) correctAnswersNumber = 0;
  else {
    const maxCorrectAnswersNumber = characters.length < answersNumber ? characters.length : answersNumber;
    correctAnswersNumber = Math.floor(Math.random() * maxCorrectAnswersNumber) + 1;
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
 * Generates questions from one of the three categories (Character, Episode or Location) depending on the arguments passed.
 * When allRecords argument is not passed, it generates question from Characters category.
 * @param {number} answersNumber
 * @param {ApiCharacter[]} allCharacters
 * @param {ApiLocation[]|ApiEpisode[]} allRecords
 * @yelds {CharacterQuestion|EpisodeOrLocationQuestion}
 */
export function* generateQuestions(answersNumber, allCharacters, allRecords = null) {
  while (1) {
    yield allRecords
      ? generateEpisodeOrLocationQuestion(answersNumber, allCharacters, allRecords)
      : generateCharacterQuestion(answersNumber, allCharacters);
  }
}
