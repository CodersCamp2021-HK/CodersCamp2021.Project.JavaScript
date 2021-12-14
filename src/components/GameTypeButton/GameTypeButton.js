import { html } from '../../shared';
import styles from './GameTypeButton.module.css';

/**
 * @param {{onClick: (e: MouseEvent) => void, id: string, text: string}} props
 * @returns {HTMLButtonElement}
 */
function GameTypeButton({ onClick, id, text }) {
  const btn = html`<button id="${id}" class="${styles.btn}" type="button">${text}</button>`;
  btn.addEventListener('click', onClick);
  // @ts-ignore
  return btn;
}

export { GameTypeButton };
