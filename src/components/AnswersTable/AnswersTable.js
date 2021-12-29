import { html } from '../../shared';
import styles from './AnswersTable.module.css';

/**
 * @param {*} answers
 * @param {*} answersDiv
 */
const answerImagesDiv = (answers, answersDiv) => {
  answers.forEach((character) => {
    const characterImage = document.createElement('img');
    characterImage.src = character.image;
    characterImage.className = styles.answerImage;
    answersDiv.appendChild(characterImage);
  });
};

/**
 * @param {number} count
 * @param {*} answer
 * @returns
 */
const characterQuestionElements = (count, answer) => {
  const questionNumber = document.createTextNode(`${count}`);
  const characterImage = document.createElement('img');
  const correctAnswers = document.createTextNode(`${answer.correctAnswers[0].name}`);
  const userAnswers = document.createTextNode(`${answer.userAnswers[0].name}`);
  const correct = document.createTextNode(`${answer.correct}`);

  characterImage.src = answer.whatIsQuestionAbout;
  characterImage.alt = answer.correctAnswers[0].name;
  characterImage.className = styles.characterImage;

  return [questionNumber, characterImage, correctAnswers, userAnswers, correct];
};

/**
 * @param {number} count
 * @param {*} answer
 * @returns
 */
const episodeOrLocationQuestionElements = (count, answer) => {
  const questionNumber = document.createTextNode(`${count}`);
  const episodeOrLocationName = document.createTextNode(`${answer.whatIsQuestionAbout}`);
  const correctAnswers = document.createElement('div');
  const userAnswers = document.createElement('div');
  const correct = document.createTextNode(`${answer.correct}`);

  correctAnswers.className = styles.answerImagesContainer;
  userAnswers.className = styles.answerImagesContainer;

  answerImagesDiv(answer.correctAnswers, correctAnswers);
  answerImagesDiv(answer.userAnswers, userAnswers);

  return [questionNumber, episodeOrLocationName, correctAnswers, userAnswers, correct];
};

/**
 * @param {import('../../components/Question').FullAnswer[]} allAnswers
 * @returns {HTMLElement}
 */
function AnswersTable(allAnswers) {
  let count = 1;

  const answersWrapper = document.createElement('div');
  answersWrapper.className = styles.answerWrapper;
  const answersTable = document.createElement('table');
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

  allAnswers.forEach((answer) => {
    const tr = document.createElement('tr');
    tr.className = styles.tableRow;
    const tdList = [0, 1, 2, 3, 4].map(() => document.createElement('td'));

    const elemList =
      answer.category === 'character'
        ? characterQuestionElements(count, answer)
        : episodeOrLocationQuestionElements(count, answer);

    tdList.forEach((td, i) => {
      td.appendChild(elemList[i]);
      tr.appendChild(td);
    });

    answersTable.appendChild(tr);
    count += 1;
  });

  answersWrapper.appendChild(answersTable);
  return answersWrapper;
}

export { AnswersTable };
