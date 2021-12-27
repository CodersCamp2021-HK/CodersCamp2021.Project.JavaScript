import { html } from '../../shared';
import styles from './Question.module.css';

/**
 * @typedef {{name: string, correct: boolean}[]} CharacterAnswers
 */

/**
 * @typedef {{name: string, image: string, correct: boolean}[]} EpisodeOrLocationAnswers
 */

/**
 * @typedef {Object} FullAnswer
 * @property {'character'|'episode'|'location'} category
 * @property {string} whatIsQuestionAbout Character image, episode title or location name depending on the category
 * @property {CharacterAnswers|EpisodeOrLocationAnswers} correctAnswers Array of correct answers
 * @property {CharacterAnswers|EpisodeOrLocationAnswers} userAnswers Array of answers selected by user
 * @property {boolean} correct
 */

/**
 * @typedef {Object} QuestionInstance
 * @property {HTMLElement} question
 * @property {() => FullAnswer} getFullAnswer
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

  const getCorrectAnswers = () => {
    return questionData.answers.filter((answer) => answer.correct);
  };

  const getUserAnswers = () => {
    return answers
      .filter((answer) => answer.classList.contains(`${styles.selected}`))
      .map((answer) => questionData.answers[`${answer.id}`]);
  };

  const isAnswerCorrect = () =>
    answers.every(
      (answer) => answer.classList.contains(`${styles.selected}`) === questionData.answers[`${answer.id}`].correct,
    );

  const getFullAnswer = () => {
    return {
      category,
      whatIsQuestionAbout: category === 'character' ? questionData.image : questionData.name,
      correctAnswers: getCorrectAnswers(),
      userAnswers: getUserAnswers(),
      correct: isAnswerCorrect(),
    };
  };

  return { question, getFullAnswer };
}

export { Question };
