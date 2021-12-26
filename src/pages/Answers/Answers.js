import { Button, Logo } from '../../components';
import { html } from '../../shared';
import styles from './Answers.module.css';

/**
 * @todo navigate to the Ranking Page
 * @param { { allAnswers: import('../../components/Question').FullAnswer[], selectedCategory: import('../Loading').QuizCategory, selectedDifficulty: import('../Loading').QuizDifficulty } & import('..').RouterProps } props
 * @returns {HTMLElement}
 */
function Answers({ router, allAnswers, selectedCategory, selectedDifficulty }) {
  const answeredQuestions = allAnswers.length;
  const points = allAnswers.filter((answer) => answer.correct).length;

  return html`<div class="${styles.wrapper}">
    <div class="${styles.content}">
      <main class="${styles.container}">
        <h3 class="${styles.heading}">
          Poprawne odpowiedzi: <span class="${styles.score}">${points}/${answeredQuestions}</span>
        </h3>
        <div class="${styles.buttonRow}">
          ${Button({
            text: 'Spróbuj jeszcze raz',
            onClick: () => {
              router.goto({ page: 'loading', data: { selectedCategory, selectedDifficulty } });
            },
          })}
          ${Button({
            text: 'Wróć do ekranu startowego',
            onClick: () => {
              router.goto({ page: 'home' });
            },
          })}
          ${Button({
            text: 'Ranking',
            disabled: true,
            onClick: () => {},
          })}
        </div>
        <div class="${styles.logoWrapper}">${Logo(31)}</div>
      </main>
    </div>
    <div class="${styles.popupOverlay}"></div>
  </div>`;
}

export { Answers };
