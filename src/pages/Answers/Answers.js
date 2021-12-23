import { Button, Logo } from '../../components';
import { html } from '../../shared';
import styles from './Answers.module.css';

/**
 * @returns {HTMLElement}
 */
function Answers() {
  return html`<div class="${styles.wrapper}">
    <div class="${styles.content}">
      <main class="${styles.container}">
        <h3 class="${styles.heading}">Poprawne odpowiedzi: <span class="${styles.score}">23/30</span></h3>
        <div class="${styles.buttonRow}">
          ${Button({
            text: 'Spróbuj jeszcze raz',
            onClick: () => {},
          })}
          ${Button({
            text: 'Wróć do ekranu startowego',
            onClick: () => {},
          })}
          ${Button({
            text: 'Ranking',
            onClick: () => {},
          })}
        </div>
        <div class="${styles.logoWrapper}">${Logo(31)}</div>
      </main>
    </div>
    <div class="${styles.popupOverlay}"></div>
  </div>`;
}

export { Answers };
