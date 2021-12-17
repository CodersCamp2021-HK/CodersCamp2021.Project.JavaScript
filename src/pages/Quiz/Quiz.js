import { html } from '../../shared';
import { Button, Logo, BackgroundDecoration } from '../../components';
import styles from './Quiz.module.css';

/**
 * @param { { generator: import('../Loading').QuestionGenerator } & import('..').RouterProps } props
 */
// eslint-disable-next-line no-unused-vars
function Quiz(props) {
  return html`<div class="${styles.wrapper}">
  ${BackgroundDecoration()}
    <div class="${styles.quizContainer}">
      <div class="${styles.headImgWrapper}"">
        <img src="../src/public/img/RicksHead.png" alt="Ricks head" />
      </div>
      <!-- TODO: render here question list component -->
      ${Button({
        onClick: (e) => {
          e.preventDefault();
        },
        text: `dalej`,
        variant: 'nextQuestion',
      })}
      <div class="${styles.logoWrapper}">${Logo(31)}</div>
    </div>
  </div>`;
}

export { Quiz };
