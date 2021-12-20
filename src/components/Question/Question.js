import { html } from '../../shared';
import styles from './Question.module.css';

/**
 * @typedef {Object} QuestionInstance
 * @property {HTMLElement} question
 * @property {() => boolean} isAnswerCorrect Function that returns whether the user has correctly answered a question
 */

/**
 * @param {(import('../../data/questions').CharacterQuestion|import('../../data/questions').EpisodeOrLocationQuestion)} questionData
 * @returns {QuestionInstance}
 */
function Question(questionData) {
  const { category } = questionData;

  const questionText = (data) => {
    if (data.category === 'character') {
      return 'Co to za postać?';
    }
    if (data.category === 'episode') {
      return `Kto grał w odcinku ${data.name}?`;
    }
    return `Które postaci mieszkają w miejscu ${data.name}?`;
  };

  const answerLetter = ['A', 'B', 'C', 'D'];

  const answers =
    category === 'character'
      ? questionData.answers.map(
          (answer, index) => html`<div id="${index}" class="${styles.answer}">
            <div class="${styles.answerItem}">${answerLetter[index]}</div>
            <p class="${styles.answerText}">${answer.name}</p>
          </div>`,
        )
      : questionData.answers.map(
          (answer, index) => html`<div id="${index}" class="${styles.answer}">
            <div class="${styles.answerItem}"><img src="${answer.image}" alt="${answer.name}" /></div>
            <p class="${styles.answerText}">${answer.name}</p>
          </div>`,
        );

  const question =
    category === 'character'
      ? html`<div id="question" class="${styles.questionContainer}">
          <p class="${styles.questionText}">${questionText(questionData)}</p>
          <div class="${styles.content}">
            <div class="${styles.characterImageDiv}">
              <img src="${questionData.image}" alt="Zdjęcie postaci" />
            </div>
            <div class="${styles.answersContainer}">${answers}</div>
          </div>
        </div>`
      : html`<div id="question" class="${styles.questionContainer}">
          <p class="${styles.questionText}">${questionText(questionData)}</p>
          <div class="${styles.answersContainer}">${answers}</div>
        </div>`;

  answers.forEach((answer) => {
    answer.addEventListener('click', () => {
      if (category === 'character') {
        answers.forEach((a) => a.classList.remove(`${styles.selected}`));
        answer.classList.add(`${styles.selected}`);
      } else {
        answer.classList.toggle(`${styles.selected}`);
      }
    });
  });

  const isAnswerCorrect = () =>
    answers.every(
      (answer) => answer.classList.contains(`${styles.selected}`) === questionData.answers[`${answer.id}`].correct,
    );

  return { question, isAnswerCorrect };
}

export { Question };
