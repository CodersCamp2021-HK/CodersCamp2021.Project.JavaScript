import { html } from '../../shared';
import styles from './Question.module.css';

/**
 * @param {(import('../../data/questions').CharacterQuestion|import('../../data/questions').EpisodeOrLocationQuestion)} questionData
 * @returns {HTMLElement} question
 */
function Question(questionData) {
  const { category } = questionData;

  const questionText = {
    character: 'Co to za postać?',
    // @ts-ignore
    episode: `Kto grał w odcinku ${questionData.name}?`,
    // @ts-ignore
    location: `Które postaci mieszkają w miejscu ${questionData.name}?`,
  };

  const answerLetter = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
  };

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
      ? html`<div class="${styles.questionContainer}">
          <p class="${styles.questionText}">${questionText[category]}</p>
          <div class="${styles.content}">
            <div class="${styles.characterImageDiv}">
              <img
                src="${
                  // @ts-ignore
                  questionData.image
                }"
                alt="Zdjęcie postaci"
              />
            </div>
            <div class="${styles.answersContainer}">${answers}</div>
          </div>
        </div>`
      : html`<div class="${styles.questionContainer}">
          <p class="${styles.questionText}">${questionText[category]}</p>
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

  return question;
}

export { Question };
