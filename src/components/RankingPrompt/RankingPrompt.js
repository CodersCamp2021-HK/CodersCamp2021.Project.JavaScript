import { html } from '../../shared';
import { Input } from '../Input';
import { PopupClose } from '../PopupClose';
import { Button } from '../Button';
import { addUserToRanking } from '../../shared/ranking';
import { ContentWrapper } from '../ContentWrapper';
import styles from './RankingPrompt.module.css';
import charactersCelebrationUrl from '../../public/img/CharactersCelebration.png';

/**
 * @param {{ correctAnswers: number, timeStamp: number,close: (id: (number | null)) => void, category: import('../../pages/Loading').QuizCategory, difficulty: import('../../pages/Loading').QuizDifficulty }} props
 * @returns {HTMLElement}
 */
function RankingPrompt({ correctAnswers, close, category, difficulty, timeStamp }) {
  const multiplier = difficulty === 'hard' ? 2 : 1;
  const score = correctAnswers * multiplier;

  let username = '';

  const usernameInput = Input({
    id: 'player-name',
    minCharacters: 3,
    onChange: (e) => {
      username = e.target.value;
    },
  });

  const submitButton = Button({ text: 'Zapisz do rankingu', onClick: 'submit' });

  const form = /** @type {HTMLFormElement} */ (
    html`<form class="${styles.form}">
      <label for="player-name" class="${styles.questionText}">Wpisz swój nick:</label>
      ${usernameInput} ${submitButton}
    </form>`
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // make sure form doesn't post
    submitButton.disabled = true; // make sure we don't submit score twice
    usernameInput.disabled = true; // make sure user can't focus irrelevant input
    submitButton.blur();
    usernameInput.blur();
    addUserToRanking(username, score, category, timeStamp);
    close(timeStamp);
  });

  const message =
    multiplier === 1
      ? `Twój wynik to ${score} punktów.`
      : `Odpowiedziałeś poprawnie na ${correctAnswers} pytań, co daje Ci ${score} punktów.`;

  return ContentWrapper({
    topRight: PopupClose({ onClick: () => close(null) }),
    content: html`<div class="${styles.mainBox}">
      <img class="${styles.image}" src="${charactersCelebrationUrl}" alt="Characters from the show dancing." />
      <div class=${styles.column}>
        <header>
          <h3 class="${styles.heading}">Gratulacje!</h3>
          <p>${message}</p>
        </header>
        ${form}
      </div>
    </div>`,
  });
}

export { RankingPrompt };
