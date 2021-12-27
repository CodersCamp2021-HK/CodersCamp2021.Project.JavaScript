import { html } from '../../shared';
import styles from './BackgroundDecoration.module.css';
import ellipse from '../../public/img/ellipse.svg';

/**
 * @returns {HTMLElement}
 */
function BackgroundDecoration() {
  /**
   * @param {string} className
   * @returns {HTMLElement}
   */

  const backgroundDecorationElement = (className) => {
    return html`<div class="${className}">
      <img src="${ellipse}" alt="" />
    </div>`;
  };

  return html`<div>
    ${backgroundDecorationElement(styles.bgDecoration1)} ${backgroundDecorationElement(styles.bgDecoration2)}
    ${backgroundDecorationElement(styles.bgDecoration3)} ${backgroundDecorationElement(styles.bgDecoration4)}
  </div>`;
}

export { BackgroundDecoration };
