import { html } from '../../shared';
import styles from './Button.module.css';

/**
 * @param {{ text: string, onClick: (e: MouseEvent) => void, variant?: 'main' | 'outlined' | 'nextQuestion' | 'gameMode', disabled?: boolean, id?: string }} props
 * @returns {HTMLButtonElement}
 */
function Button({ text, onClick, variant = 'main', disabled = false, id }) {
  const classNamesForVariant = {
    main: styles.ButtonMain,
    outlined: styles.ButtonOutlined,
    nextQuestion: styles.ButtonNextQuestion,
    gameMode: styles.ButtonGameMode,
  };

  const showText = variant === 'nextQuestion' ? html`<span>${text} &#8594</span>` : text;

  const button = html`<button
    class="${classNamesForVariant[variant]}"
    type="button"
    ${disabled ? ' disabled' : ''}
    ${id ? `id=${id}` : ''}
  >
    ${showText}
  </button>`;

  button.addEventListener('click', onClick);
  // @ts-ignore
  return button;
}

export { Button };
