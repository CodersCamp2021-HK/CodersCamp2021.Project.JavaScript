import { html, render } from '../../shared';
import styles from './Ranking.module.css';
import { RankingTable, Button, ContentWrapper } from '../../components';

/**
 * @param {{ text: string, onClick: ((e: MouseEvent) => void), id?: string, selectedCategory: QuizCategory }} props
 * @returns {HTMLElement}
 */

function TabBtn({ text, onClick, id, selectedCategory }) {
  const button = html`<button class="${styles.flexBtn}" type="button" id="${id}">${text}</button>`;
  if (selectedCategory === id) {
    button.classList.add(styles.flexBtnFocus);
  }

  button.addEventListener('click', onClick);

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
  let rankingTable = RankingTable({ id, category });
  let currentCategory = category;

  /**
   * @todo there's probably a better way to implement active-tab switching
   * @param {QuizCategory} gameType
   */
  const onGameTypeSelect = (gameType) => {
    document.getElementById(currentCategory).classList.remove(styles.flexBtnFocus);
    currentCategory = gameType;
    document.getElementById(currentCategory).classList.add(styles.flexBtnFocus);

    rankingTable = render({
      element: RankingTable({
        category: gameType,
      }),
      on: rankingTable,
    });
  };

  const homeBtn = Button({
    text: 'Wróć do ekranu startowego',
    variant: 'normal',
    onClick: () => {
      router.goto({ page: 'home' });
    },
  });

  return ContentWrapper({
    hasLogo: true,
    topAttachment: html`<div class=${styles.flexContainer}>
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
    </div>`,
    content: html`<div class=${styles.rectangle}>
      <h1 class=${styles.text}>Ranking</h1>
      ${rankingTable} ${homeBtn}
    </div>`,
  });
}

export { Ranking };
