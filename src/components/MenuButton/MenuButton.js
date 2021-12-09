import { html } from '../../shared';
import styles from './MenuButton.module.css';

/**
 * @param {{onClick: (e: MouseEvent) => void, text: string, variant?: 'normal' | 'outlined', disabled?: boolean }} props
 * @returns {HTMLButtonElement}
 */
function MenuButton({ onClick, text, variant, disabled }) {
  const classNamesForStyle = {
    normal: styles.btnNormal,
    outlined: styles.btnOutlined,
  };

  const btn = html`<button
    class="${classNamesForStyle[variant ?? 'normal']}"
    type="button"
    ${disabled ?? false ? ' disabled aria-disabled="true"' : ''}
  >
    ${text}
  </button>`;
  btn.addEventListener('click', onClick);
  // @ts-ignore
  return btn;
}

export { MenuButton };
