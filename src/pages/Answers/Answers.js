import { Button, Logo, RankingPrompt } from '../../components';
import { html } from '../../shared';
import styles from './Answers.module.css';

/**
 * @todo navigate to the ranking page, add the answers table
 * @param { { allAnswers: import('../../components/Question').FullAnswer[], selectedCategory: import('../Loading').QuizCategory, selectedDifficulty: import('../Loading').QuizDifficulty } & import('..').RouterProps } props
 * @returns {HTMLElement}
 */
function Answers({ router, allAnswers, selectedCategory, selectedDifficulty }) {
  const answeredQuestions = allAnswers.length;
  const correctAnswers = allAnswers.filter((answer) => answer.correct).length;
  const score = selectedDifficulty === 'hard' ? 2 * correctAnswers : correctAnswers;

  const popupOverlay = html`<div class="${styles.popupOverlay}"></div>`;

  const closePopup = () => {
    const transitionSeconds = parseFloat(getComputedStyle(popupOverlay).getPropertyValue('transition-duration'));

    popupOverlay.style.opacity = '0';

    setInterval(() => {
      popupOverlay.style.display = 'none';
    }, transitionSeconds * 1000);
  };

  const rankingPrompt = RankingPrompt({ score, category: selectedCategory, close: closePopup });

  popupOverlay.appendChild(rankingPrompt);

  return html`<div class="${styles.wrapper}">
    <div class="${styles.content}">
      <main class="${styles.container}">
        <h3 class="${styles.heading}">
          Poprawne odpowiedzi: <span class="${styles.score}">${correctAnswers}/${answeredQuestions}</span>
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
    ${popupOverlay}
  </div>`;
}

export { Answers };
