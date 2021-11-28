import { html } from '../../shared';
import styles from './Button.module.css';

/**
 * @param {{onClick: (e: MouseEvent) => void, text: string}} props
 * @returns {HTMLButtonElement}
 */
function Button({ onClick, text }) {
  const btn = html`<button class="${styles.btn}" type="button">${text}</button>`;
  btn.addEventListener('click', onClick);
  // @ts-ignore
  return btn;
}

export { Button };
