import { html } from '../../shared';
import styles from './Graphics.module.css';

/**
 * @typedef {'logo' | 'head'} GraphicsType
 */

/**
 * @param {GraphicsType} type
 * @param {number} width (rem)
 * @returns {HTMLElement}
 */
function Graphics(type, width) {
  const { url, alt } =
    type === 'head'
      ? { url: '../src/images/RicksHead.png', alt: `Rick's Head` }
      : { url: '../src/images/RickAndMortyLogo.png', alt: 'Rick And Morty logo' };

  const graphics = html`<div class="${styles.graphicsContainer}">
    <img src="${url}" alt="${alt}" />
  </div>`;

  graphics.style.width = `${width}rem`;
  return graphics;
}

export { Graphics };
