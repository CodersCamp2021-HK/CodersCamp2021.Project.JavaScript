import { html } from '../../shared';
import styles from './Button.module.css';

/**
 * @param {{ text: string, onClick: (e: MouseEvent) => void, variant?: 'normal' | 'outlined' | 'nextQuestion' | 'gameMode', disabled?: boolean }} props
 * * @param  {...string} id
 * @returns {HTMLButtonElement}
 */
function Button({ text, onClick, variant = 'normal', disabled = false }, ...id) {
  const classNamesForVariant = {
    normal: styles.ButtonNormal,
    outlined: styles.ButtonOutlined,
    nextQuestion: styles.ButtonNextQuestion,
    gameMode: styles.ButtonGameMode,
  };
  const showText = variant === 'nextQuestion' ? html`<span>${text} &#8594</span>` : text;

  const button = html`<button
    id="${id}"
    class="${classNamesForVariant[variant]}"
    type="button"
    ${disabled ? ' disabled' : ''}
  >
    ${showText}
  </button>`;

  button.addEventListener('click', onClick);
  // @ts-ignore
  return button;
}

export { Button };
