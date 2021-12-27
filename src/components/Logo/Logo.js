import { html } from '../../shared';
import styles from './Logo.module.css';
import logoImg from '../../public/img/RickAndMortyLogo.png';

/**
 * @param {number} width (rem)
 * @returns {HTMLElement}
 */
function Logo(width) {
  const alt = 'Rick And Morty logo';

  const logo = html`<div class="${styles.logoContainer}">
    <img src="${logoImg}" alt="${alt}" />
  </div>`;

  logo.style.width = `${width}rem`;
  return logo;
}

export { Logo };
