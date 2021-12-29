import { html, render } from '../../shared';
import { Button, Logo, BackgroundDecoration, Question, PopupClose, QuestionCounter, Timer } from '../../components';
import styles from './Quiz.module.css';
import head from '../../public/img/RicksHead.png';

/**
 * @param { { generator: import('../../data/questions').QuestionGenerator, selectedCategory: import('../Loading').QuizCategory, selectedDifficulty: import('../Loading').QuizDifficulty } & import('..').RouterProps } props
 */
function Quiz({ generator, router, ...otherProps }) {
  /**
   * @type {import('../../components/Question').FullAnswer[]}
   */
  const allAnswers = [];
  const { element: counterElement, increment } = QuestionCounter();

  let finishCounting;
  const endQuiz = () => {
    finishCounting();
    router.goto({ page: 'answers', data: { allAnswers, ...otherProps } });
  };
  let question = Question(generator.next().value);

  return html`<div class="${styles.wrapper}">
    ${BackgroundDecoration()}
    <div class="${styles.quizContainer}">
      <div class="${styles.counterElementWrapper}">${counterElement}</div>
      <div class="${styles.popupCloseWrapper}">${PopupClose({ onClick: endQuiz })}</div>
      <div class="${styles.headImgWrapper}">
        <img src="${head}" alt="Ricks head" />
      </div>
      ${question.question}
      ${Button({
        onClick: (e) => {
          e.preventDefault();
          allAnswers.push(question.getFullAnswer());
          question = Question(generator.next().value);
          increment();
          render({ on: document.getElementById('question'), element: question.question });
        },
        text: 'dalej',
        variant: 'nextQuestion',
      })}
      ${Timer({
        startingMinutes: 2,
        onFinish: endQuiz,
        stopTimer: (clearTimer) => {
          finishCounting = clearTimer;
        },
      })};
      <div class="${styles.logoWrapper}">${Logo(31)}</div>
    </div>
  </div>`;
}

export { Quiz };
