import { html } from '../../shared';
import styles from './Logo.module.css';

/**
 * @param {number} width (rem)
 * @returns {HTMLElement}
 */
function Logo(width) {
  const url = '../src/public/img/RickAndMortyLogo.png';
  const alt = 'Rick And Morty logo';

  const logo = html`<div class="${styles.logoContainer}">
    <img src="${url}" alt="${alt}" />
  </div>`;

  logo.style.width = `${width}rem`;
  return logo;
}

export { Logo };
