import { html } from '../../shared';
import styles from './PopupClose.module.css';
import blob from '../../public/img/blob.svg';

const crossIcon = html`<svg class="${styles.crossIcon}" viewBox="0 0 45 38" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M44.0715 3.82361L39.6329 0L22.0357 15.1588L4.43863 0L0 3.82361L17.5971 18.9824L0 34.1413L4.43863 37.9649L22.0357 22.8061L39.6329 37.9649L44.0715 34.1413L26.4744 18.9824L44.0715 3.82361Z"
  />
</svg>`;

/**
 * @param {{onClick: (e: MouseEvent) => void}} props
 * @returns {HTMLElement}
 */
function PopupClose({ onClick }) {
  const button = html`<button type="button" class="${styles.blobBox}">
    <img src="${blob}" alt="" />
    ${crossIcon}
  </button>`;

  button.addEventListener('click', onClick);

  return button;
}

export { PopupClose };
