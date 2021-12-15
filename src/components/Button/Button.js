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
    gameMode: styles.ButtonGameType,
  };
  let button;
  if (variant === 'nextQuestion') {
    button = html`<button class="${classNamesForVariant[variant]}" type="button" ${disabled ? ' disabled' : ''}>
      ${text} &raquo
    </button>`;
  } else {
    button = html`<button
      id="${id}"
      class="${classNamesForVariant[variant]}"
      type="button"
      ${disabled ? ' disabled' : ''}
    >
      ${text}
    </button>`;
  }
  button.addEventListener('click', onClick);
  // @ts-ignore
  return button;
}

export { Button };
