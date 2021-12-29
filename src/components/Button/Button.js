import { html } from '../../shared';
import styles from './Button.module.css';

/**
 * @param {{ text: string, onClick: ((e: MouseEvent) => void) | 'submit', variant?: 'normal' | 'main' | 'outlined' | 'nextQuestion' | 'gameMode', disabled?: boolean, id?: string }} props
 * @returns {HTMLButtonElement}
 */
function Button({ text, onClick, variant = 'normal', disabled = false, id }) {
  const classNamesForVariant = {
    normal: styles.ButtonNormal,
    main: styles.ButtonMain,
    outlined: styles.ButtonOutlined,
    nextQuestion: styles.ButtonNextQuestion,
    gameMode: styles.ButtonGameMode,
  };

  const showText = variant === 'nextQuestion' ? html`<span>${text} &#8594</span>` : text;

  const button = /** @type {HTMLButtonElement} */ (
    html`<button
      class="${classNamesForVariant[variant]}"
      type="${onClick === 'submit' ? 'submit' : 'button'}"
      ${disabled ? ' disabled' : ''}
      ${id ? `id=${id}` : ''}
    >
      ${showText}
    </button>`
  );

  if (onClick !== 'submit') {
    button.addEventListener('click', onClick);
  }

  return button;
}

export { Button };
