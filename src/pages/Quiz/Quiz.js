import { html } from '../../shared';
import { Button, Logo, BackgroundDecoration, Question, PopupClose, QuestionCounter } from '../../components';
import styles from './Quiz.module.css';
import head from '../../public/img/RicksHead.png';

/**
 * @param { { generator: import('../Loading').QuestionGenerator } & import('..').RouterProps } props
 */
// eslint-disable-next-line no-unused-vars
function Quiz(props) {
  const allAnswers = [];
  const { element: counterElement, increment, getCount } = QuestionCounter();
  const onClick = () => {
    // eslint-disable-next-line no-unused-vars
    const answeredQuestions = getCount() - 1;
    // eslint-disable-next-line no-unused-vars
    const points = allAnswers.filter((answer) => answer.correct).length;
  };
  // @ts-ignore
  let question = Question(props.generator.next().value);

  return html`<div class="${styles.wrapper}">
    ${BackgroundDecoration()}
    <div class="${styles.quizContainer}">
      <div class="${styles.counterElementWrapper}">${counterElement}</div>
      <div class="${styles.popupCloseWrapper}">${PopupClose({ onClick })}</div>
      <div class="${styles.headImgWrapper}">
        <img src="${head}" alt="Ricks head" />
      </div>
      ${question.question}
      ${Button({
        onClick: (e) => {
          e.preventDefault();
          allAnswers.push(question.getFullAnswer());
          // @ts-ignore
          question = Question(props.generator.next().value);
          increment();
          document.getElementById('question').replaceWith(question.question);
        },
        text: 'dalej',
        variant: 'nextQuestion',
      })}
      <div class="${styles.logoWrapper}">${Logo(31)}</div>
    </div>
  </div>`;
}

export { Quiz };
