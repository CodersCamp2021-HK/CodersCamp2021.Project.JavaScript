import { html } from '../../shared';
import styles from './BackgroundDecoration.module.css';

/**
 * @returns {HTMLElement}
 */
function BackgroundDecoration() {
  const url = '../src/public/img/ellipse.svg';

  return html`<div>
    <div class="${styles.bgDecoration1}">
      <img src="${url}" alt="" />
    </div>
    <div class="${styles.bgDecoration2}">
      <img src="${url}" alt="" />
    </div>
    <div class="${styles.bgDecoration3}">
      <img src="${url}" alt="" />
    </div>
    <div class="${styles.bgDecoration4}">
      <img src="${url}" alt="" />
    </div>
  </div>`;
}

export { BackgroundDecoration };
