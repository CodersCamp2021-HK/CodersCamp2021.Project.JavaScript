import { html } from '../../shared';
import './GameTypeButton.css';
import styles from './GameTypeButton.module.css';

/**
 * @param {{onClick: (e: MouseEvent) => void, text: string}} props
 * @returns {HTMLButtonElement}
 */
function GameTypeButton({ onClick, text }) {
  const btn = html`<button class="${styles.btn}" type="button">${text}</button>`;
  btn.addEventListener('click', onClick);
  // @ts-ignore
  return btn;
}

export { GameTypeButton };
