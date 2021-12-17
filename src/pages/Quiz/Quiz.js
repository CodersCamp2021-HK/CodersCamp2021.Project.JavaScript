import { html } from '../../shared';
import { Button } from '../../components';
import styles from './Quiz.module.css';

/**
 * @param { { generator: import('../Loading').QuestionGenerator } & import('..').RouterProps } props
 */
// eslint-disable-next-line no-unused-vars
function Quiz(router, variant, props) {
  return html`<div class="${styles.wrapper}">
    <div class="${styles.quizContainer}">
      ${Button({
        onClick: (e) => {
          e.preventDefault();
          // router.goto({ page: 'todo', data: { id: x } });
        },
        text: `dalej`,
        variant: 'nextQuestion',
      })},
    </div>
  </div>`;
}

export { Quiz };
