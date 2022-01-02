import { html, render } from '../../shared';
import styles from './Ranking.module.css';
import { RankingTable, Button } from '../../components';

/**
 * @param {{ text: string, onClick: ((e: MouseEvent) => void) | 'submit', id?: string, selectedCategory: QuizCategory }} props
 * @returns {HTMLElement}
 */

function TabBtn({ text, onClick, id, selectedCategory }) {
  const button = html`<button class="${styles.flexBtn}" type="${onClick === 'submit' ? 'submit' : 'button'}" id="${id}">
    ${text}
  </button>`;
  if (selectedCategory === id) {
    button.classList.add(styles.flexBtnFocus);
  }

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
 * @returns {HTMLElement}
 */
function Ranking({ router, id, category }) {
  const rankingTable = html`<div class=${styles.table}>${RankingTable({ id, category })}</div>`;

  /**
   * @param {QuizCategory} gameType
   */
  const onGameTypeSelect = (gameType) => {
    document.getElementById(category).classList.remove(styles.flexBtnFocus);
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
        id: 'character',
        selectedCategory: category,
      })}
      ${TabBtn({
        text: 'Bohaterowie odcinka',
        onClick: () => {
          onGameTypeSelect('episode');
        },
        id: 'episode',
        selectedCategory: category,
      })}
      ${TabBtn({
        text: 'Kto tu mieszka',
        onClick: () => {
          onGameTypeSelect('location');
        },
        id: 'location',
        selectedCategory: category,
      })}
      ${TabBtn({
        text: 'Mieszane',
        onClick: () => {
          onGameTypeSelect('mixed');
        },
        id: 'mixed',
        selectedCategory: category,
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
