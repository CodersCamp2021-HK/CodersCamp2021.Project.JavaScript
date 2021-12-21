import { html } from '../../shared';
import { Button, Logo, BackgroundDecoration, Question } from '../../components';
import styles from './Quiz.module.css';
import head from '../../public/img/RicksHead.png';

/**
 * @param { { generator: import('../Loading').QuestionGenerator } & import('..').RouterProps } props
 */
// eslint-disable-next-line no-unused-vars
function Quiz(props) {
  // @ts-ignore
  const { question } = Question(props.generator.next().value);
  return html`<div class="${styles.wrapper}">
  ${BackgroundDecoration()}
    <div class="${styles.quizContainer}">
      <div class="${styles.headImgWrapper}"">
        <img src="${head}" alt="Ricks head" />
      </div>
      ${question}
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
