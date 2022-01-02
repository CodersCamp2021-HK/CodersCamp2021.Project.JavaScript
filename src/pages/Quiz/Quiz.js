import { html, render } from '../../shared';
import { Button, Question, PopupClose, QuestionCounter, Timer, ContentWrapper } from '../../components';
import styles from './Quiz.module.css';

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

  return ContentWrapper({
    hasHead: true,
    hasLogo: true,
    hasBgDecoration: true,
    topLeft: counterElement,
    topRight: PopupClose({ onClick: endQuiz }),
    botRight: Timer({
      startingMinutes: 2,
      onFinish: endQuiz,
      stopTimer: (clearTimer) => {
        finishCounting = clearTimer;
      },
    }),
    content: html`<div class="${styles.quizContainer}">
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
    </div>`,
  });
}

export { Quiz };
