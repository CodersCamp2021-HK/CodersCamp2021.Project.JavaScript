import { html } from '../../shared';
import styles from './Input.module.css';

/**
 * @param {{minCharacters: number, maxCharacters: number, onChange: (e) => void }} props
 */
function Input({ minCharacters, maxCharacters = 20, onChange }) {
  const input = html`<input
      class="${styles.input}"
      type="text"
      minlength="${minCharacters || 1}"
      maxlength="${maxCharacters}"
      placeholder="Nazwa gracza"
    />
    required`;
  input.addEventListener('input', onChange);
  return input;
}

export { Input };
