import { html } from '../../shared';
import styles from './Input.module.css';

/**
 * @param {{ id?: string, minCharacters: number, maxCharacters?: number, onChange: (e) => void }} props
 * @returns {HTMLInputElement}
 */
function Input({ id, minCharacters, maxCharacters = 20, onChange }) {
  const input = /** @type {HTMLInputElement} */ (
    html`<input
      class="${styles.input}"
      type="text"
      minlength="${minCharacters || 1}"
      maxlength="${maxCharacters}"
      placeholder="Nazwa gracza"
      required
    />`
  );

  if (id) {
    input.id = id;
    input.name = id;
  }

  input.addEventListener('input', onChange);
  return input;
}

export { Input };
