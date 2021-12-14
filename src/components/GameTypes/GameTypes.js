import { html } from '../../shared';
import { GameTypeButton } from '../GameTypeButton';
import styles from './GameTypes.module.css';

/**
 * @param {{onSelect: (e: MouseEvent) => void, heading: string, categories: object[], layout?: 'default' | 'halfWidth' }} props
 */

function GameTypes({ onSelect, heading, categories, layout = 'default' }) {
  const typeStyles = {
    default: styles.containerFullWidth,
    halfWidth: styles.containerHalfWidth,
  };

  const selectedTypes = (e) => {
    const container = e.target.parentElement;
    const containerButtons = container.querySelectorAll('button');

    if (e.target.matches('button')) {
      [...containerButtons].forEach((button) => {
        button.classList.remove(styles.selectedType);
      });
      e.target.classList.add(styles.selectedType);
      onSelect(e.target);
    }
  };

  const createTypesList = () =>
    categories.map((category) =>
      GameTypeButton({
        onClick: (e) => {
          selectedTypes(e);
        },
        text: category.text,
        id: category.id,
      }),
    );

  return html`<div>
    <h3 class="${styles.heading}">${heading}</h3>
    <div class="${styles.container} ${typeStyles[layout]}">${createTypesList()}</div>
  </div>`;
}

export { GameTypes };
