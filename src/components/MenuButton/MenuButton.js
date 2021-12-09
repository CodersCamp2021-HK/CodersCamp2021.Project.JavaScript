import { html } from '../../shared';
import styles from './MenuButton.module.css';

/**
 * @param {{ text: string, onClick: (e: MouseEvent) => void, variant?: 'normal' | 'outlined', disabled?: boolean }} props
 * @returns {HTMLButtonElement}
 */
function MenuButton({ text, onClick, variant = 'normal', disabled = false }) {
  const classNamesForVariant = {
    normal: styles.menuButtonNormal,
    outlined: styles.menuButtonOutlined,
  };

  const menuButton = html`<button class="${classNamesForVariant[variant]}" type="button" ${disabled ? ' disabled' : ''}>
    ${text}
  </button>`;
  menuButton.addEventListener('click', onClick);
  // @ts-ignore
  return menuButton;
}

export { MenuButton };
