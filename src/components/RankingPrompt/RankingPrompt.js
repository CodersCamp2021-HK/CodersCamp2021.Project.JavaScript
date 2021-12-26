import { html } from '../../shared';
import { Input } from '../Input';
import { PopupClose } from '../PopupClose';
import { Button } from '../Button';
import { addUserToRanking } from '../../shared/ranking';
import styles from './RankingPrompt.module.css';
import charactersCelebrationUrl from '../../public/img/CharactersCelebration.png';

/**
 * @param {{ score: number, close: () => void, category: import('../../pages/Loading').QuizCategory }} props
 * @returns {HTMLElement}
 */
function RankingPrompt({ score, close, category }) {
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

    addUserToRanking(username, score, category);

    close();
  });

  return html` <section class="${styles.mainBox}">
    <div class="${styles.closeWrapper}">${PopupClose({ onClick: close })}</div>
    <img class="${styles.image}" src="${charactersCelebrationUrl}" alt="Characters from the show dancing." />
    <div class=${styles.column}>
      <header>
        <h3 class="${styles.heading}">Gratulacje!</h3>
        <p>Twój wynik to ${score} pkt.</p>
      </header>
      ${form}
    </div>
  </section>`;
}

export { RankingPrompt };
