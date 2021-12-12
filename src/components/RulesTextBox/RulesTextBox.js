import { html } from '../../shared';
import styles from './RulesTextBox.module.css';

/**
 * @param {string} header
 * @param {string} text
 */
function RulesBox(header, text) {
  const box = html`<div class="${styles.box}">
    <h3>${header}</h3>
    <p class="${styles.boxRulesText}">${text}</p>
  </div>`;
  return box;
}
export { RulesBox };
