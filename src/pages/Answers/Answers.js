import { Button, Logo } from '../../components';
import { html } from '../../shared';
import styles from './Answers.module.css';

/**
 * @param { { allAnswers: import('../../components/Question').FullAnswer[] } & import('..').RouterProps } props
 * @returns {HTMLElement}
 */
function Answers({ allAnswers }) {
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
            onClick: () => {},
          })}
          ${Button({
            text: 'Wróć do ekranu startowego',
            onClick: () => {},
          })}
          ${Button({
            text: 'Ranking',
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
