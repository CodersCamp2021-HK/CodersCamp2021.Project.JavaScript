import { html, render } from '../../shared';
import { Button, Logo, BackgroundDecoration, Question, PopupClose, QuestionCounter, Timer } from '../../components';
import styles from './Quiz.module.css';
import head from '../../public/img/RicksHead.png';

/**
 * @param { { generator: import('../../data/questions').QuestionGenerator } & import('..').RouterProps } props
 */
function Quiz(props) {
  const allAnswers = [];
  const { element: counterElement, increment, getCount } = QuestionCounter();
  const onClick = () => {
    // eslint-disable-next-line no-unused-vars
    const answeredQuestions = getCount() - 1;
    // eslint-disable-next-line no-unused-vars
    const points = allAnswers.filter((answer) => answer.correct).length;
  };
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
          question = Question(props.generator.next().value);
          increment();
          render({ on: document.getElementById('question'), element: question.question });
        },
        text: 'dalej',
        variant: 'nextQuestion',
      })}
      ${Timer({
        startingMinutes: 2,
        onFinish: () => {
          // TODO: go to next page/popup
        },
      })};
      <div class="${styles.logoWrapper}">${Logo(31)}</div>
    </div>
  </div>`;
}

export { Quiz };
