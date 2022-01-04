import { html } from '../../shared';
import styles from './AnswersTable.module.css';
import check from '../../public/img/check.svg';
import x from '../../public/img/x.svg';

/**
 * @typedef {import('../../components/Question').FullAnswerCharacterCategory} FullAnswerCharacterCategory
 */

/**
 * @typedef {import('../../components/Question').FullAnswerEpisodeOrLocationCategory} FullAnswerEpisodeOrLocationCategory
 */

/**
 * Generates an image element with an icon depending on the correctness of the answer.
 * @param {boolean} correct
 * @returns {HTMLElement}
 */
const correctIcon = (correct) => {
  const img = document.createElement('img');
  img.className = styles.correctIcon;
  img.src = correct ? check : x;
  img.alt = '';
  return img;
};

/**
 * Generates a div with character avatars for correct answers and user answers (for the episodes and localization categories)
 * @param {import('../../components/Question').EpisodeOrLocationAnswers} answers
 * @param {HTMLDivElement} answersDiv
 */
const answerImagesDiv = (answers, answersDiv) => {
  answers.forEach((character) => {
    const characterImage = document.createElement('img');
    characterImage.src = character.image;
    characterImage.alt = character.name;
    characterImage.title = character.name;
    characterImage.className = styles.answerImage;
    answersDiv.appendChild(characterImage);
  });
};

/**
 * @param {number} count
 * @param {FullAnswerCharacterCategory} answer
 * @returns {[Text, HTMLImageElement, Text, Text, HTMLElement]}
 */
const characterQuestionElements = (count, answer) => {
  const questionNumber = document.createTextNode(`${count}`);
  const characterImage = document.createElement('img');
  const correctAnswer = document.createTextNode(`${answer.correctAnswers[0].name}`);
  const userAnswer = document.createTextNode(`${answer.userAnswers[0] ? answer.userAnswers[0].name : ''}`);
  const correct = correctIcon(answer.correct);

  characterImage.src = answer.whatIsQuestionAbout;
  characterImage.alt = answer.correctAnswers[0].name;
  characterImage.title = answer.correctAnswers[0].name;
  characterImage.className = styles.characterImage;

  return [questionNumber, characterImage, correctAnswer, userAnswer, correct];
};

/**
 * @param {number} count
 * @param {FullAnswerEpisodeOrLocationCategory} answer
 * @returns {[Text, Text, HTMLDivElement, HTMLDivElement, HTMLElement]}
 */
const episodeOrLocationQuestionElements = (count, answer) => {
  const questionNumber = document.createTextNode(`${count}`);
  const episodeOrLocationName = document.createTextNode(`${answer.whatIsQuestionAbout}`);
  const correctAnswers = document.createElement('div');
  const userAnswers = document.createElement('div');
  const correct = correctIcon(answer.correct);

  correctAnswers.className = styles.answerImagesContainer;
  userAnswers.className = styles.answerImagesContainer;

  answerImagesDiv(answer.correctAnswers, correctAnswers);
  answerImagesDiv(answer.userAnswers, userAnswers);

  return [questionNumber, episodeOrLocationName, correctAnswers, userAnswers, correct];
};

/**
 * @param {FullAnswerCharacterCategory[] | FullAnswerEpisodeOrLocationCategory[]} allAnswers
 * @returns {HTMLElement}
 */
function AnswersTable(allAnswers) {
  let count = 1;

  const answersWrapper = document.createElement('div');
  answersWrapper.className = styles.answersWrapper;

  const answersTable = document.createElement('table');
  answersTable.className = styles.answersTable;

  const tableHeader = html`<table>
    <thead>
      <th>Nr</th>
      <th>Pytanie</th>
      <th>Poprawna odpowiedź</th>
      <th>Twoja odpowiedź</th>
      <th></th>
    </thead>
  </table>`.firstElementChild;

  answersTable.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  answersTable.appendChild(tableBody);

  allAnswers.forEach((answer) => {
    const tr = document.createElement('tr');
    tr.className = styles.tableRow;
    const tdList = [0, 1, 2, 3, 4].map(() => document.createElement('td'));

    const elemList =
      answer.category === 'character'
        ? characterQuestionElements(count, answer)
        : episodeOrLocationQuestionElements(count, answer);

    tdList.forEach((td, i) => {
      td.className = styles.tableCell;
      td.appendChild(elemList[i]);
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
    count += 1;
  });

  answersWrapper.appendChild(answersTable);
  return answersWrapper;
}

export { AnswersTable };
