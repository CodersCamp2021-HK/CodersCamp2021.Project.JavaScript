import { html } from '../../shared';
import { GameTypeButton } from '../GameTypeButton';
import styles from './GameTypes.module.css';

/**
 * @param {{heading: string, categories: Array, role: string, layout: string }} props
 */

function GameTypes({ heading, categories, role, layout = 'default' }) {
  const typeStyles = {
    default: styles.wrapperFullWidth,
    halfWidth: styles.wrapperHalfWidth,
  };

  const selectedTypes = (e) => {
    const container = e.target.closest('[role]');
    const containerButtons = container.querySelectorAll('button');

    if (e.target.matches('button')) {
      [...containerButtons].forEach((button) => {
        button.classList.remove('selected');
      });
      e.target.classList.add('selected');
    }
  };

  const createTypesList = () =>
    categories.map(
      (category) => html`<div class="${styles.wrapper} ${typeStyles[layout]}">
        ${GameTypeButton({
          onClick: (e) => {
            selectedTypes(e);
          },
          text: category,
        })}
      </div>`,
    );

  return html`<div class="${styles.container}" role="${role}">
    <h3 class="${styles.heading}">${heading}</h3>
    ${createTypesList()}
  </div>`;
}

export { GameTypes };
