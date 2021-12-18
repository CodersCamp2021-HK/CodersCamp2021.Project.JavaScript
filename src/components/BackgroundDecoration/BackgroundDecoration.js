// @ts-nocheck
import { html } from '../../shared';
import styles from './BackgroundDecoration.module.css';

/**
 * @returns {HTMLElement}
 */
function BackgroundDecoration() {
  const url = '../src/public/img/ellipse.svg';

  /**
   * @param {string} className
   * @returns {HTMLElement}
   */

  const backgroundDecorationElement = (className) => {
    return html`<div class="${className}">
      <img src="${url}" alt="" />
    </div>`;
  };

  return html`<div>
    ${backgroundDecorationElement(styles.bgDecoration1)} ${backgroundDecorationElement(styles.bgDecoration2)}
    ${backgroundDecorationElement(styles.bgDecoration3)} ${backgroundDecorationElement(styles.bgDecoration4)}
  </div>`;
}

export { BackgroundDecoration };
