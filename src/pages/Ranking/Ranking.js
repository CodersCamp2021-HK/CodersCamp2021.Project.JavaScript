import { html, render } from '../../shared';
import styles from './Ranking.module.css';
import { RankingTable, Button } from '../../components';

/**
 * @param {{ text: string, onClick: ((e: MouseEvent) => void) | 'submit' }} props
 * @returns {HTMLButtonElement}
 */

function TabBtn({ text, onClick }) {
  const button = /** @type {HTMLButtonElement} */ (
    html`<button class="${styles.flexBtn}" type="${onClick === 'submit' ? 'submit' : 'button'}">${text}</button>`
  );

  if (onClick !== 'submit') {
    button.addEventListener('click', onClick);
  }

  return button;
}

/**
 * @typedef {'character' | 'episode' | 'location' | 'mixed'} QuizCategory
 */

/**
 * @param {{id?: number, category: QuizCategory} & import('..').RouterProps} props

 * @returns
 */
function Ranking({ router, id, category }) {
  const rankingTable = html`<div class=${styles.table}>${RankingTable({ id, category })}</div>`;
  const onGameTypeSelect = (gameType) => {
    render({
      element: RankingTable({
        category: gameType,
      }),
      on: rankingTable.firstElementChild,
    });
  };

  const homeBtn = Button({
    text: 'Wróć do ekranu startowego',
    variant: 'normal',
    onClick: () => {
      router.goto({ page: 'home' });
    },
  });
  return html` <div class=${styles.content}>
    <div class=${styles.flexContainer}>
      ${TabBtn({
        text: 'Co to za postać',
        onClick: () => {
          onGameTypeSelect('character');
        },
      })}
      ${TabBtn({
        text: 'Bohaterowie odcinka',
        onClick: () => {
          onGameTypeSelect('episode');
        },
      })}
      ${TabBtn({
        text: 'Kto tu mieszka',
        onClick: () => {
          onGameTypeSelect('location');
        },
      })}
      ${TabBtn({
        text: 'Mieszane',
        onClick: () => {
          onGameTypeSelect('mixed');
        },
      })}
    </div>
    <div class=${styles.rectangle}>
      <h1 class=${styles.text}>Ranking</h1>
      ${rankingTable}
      <div class=${styles.homeBtn}>${homeBtn}</div>
    </div>
  </div>`;
}

export { Ranking };
