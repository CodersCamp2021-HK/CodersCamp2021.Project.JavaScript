import { html } from '../../shared';
import styles from './Logo.module.css';

/**
 * @param {number} width (rem)
 * @returns
 */
function Logo(width) {
  const logo = html`<div class="${styles.logo}">
    <img src="../src/images/RickAndMortyLogo.png" alt="Rick And Morty logo" />
  </div>`;
  logo.style.width = `${width}rem`;
  return logo;
}

export { Logo };
