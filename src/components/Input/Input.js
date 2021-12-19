import { html } from '../../shared';
import styles from './Input.module.css';

/**
 * @param {} props
 * @returns {HTMLButtonElement}
 */
function Input({ onChange, minCharacters }) {
  const input = html`<input placeholder="Nazwa gracza" type="text" />`;

  input.addEventListener('input', onChange);
  return input;
}

export { Input };
