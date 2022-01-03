import { html } from '../../shared';
import headImg from '../../public/img/RicksHead.png';
import logoImg from '../../public/img/RickAndMortyLogo.png';
import { BackgroundDecoration } from '../BackgroundDecoration';
import styles from './ContentWrapper.module.css';

/**
 *
 * @param {{
 *  hasHead?: boolean,
 *  hasLogo?: boolean,
 *  hasBgDecoration?: boolean,
 *  topLeft?: string | HTMLElement,
 *  topRight?: string | HTMLElement,
 *  botRight?: string | HTMLElement,
 *  topAttachment?: string | HTMLElement,
 *  content: string | HTMLElement
 * }} props
 * @returns {HTMLDivElement}
 */
function ContentWrapper({
  hasHead = false,
  hasLogo = false,
  hasBgDecoration = false,
  topLeft = '',
  topRight = '',
  botRight = '',
  topAttachment = '',
  content,
}) {
  const head = html`<div class="${styles.headWrapper}"><img src="${headImg}" alt="Głowa Ricka." /></div>`;
  const logo = html`<div class="${styles.logoWrapper}"><img src="${logoImg}" alt="Logo serialu." /></div>`;

  const hasAttachment = topAttachment !== '';

  const mTop = hasHead || topLeft !== '' || topRight !== '' || hasAttachment;
  const mBot = hasLogo || botRight !== '';

  const margins = `
  margin-top: ${mTop ? 'var(--panel-padding)' : '0'};
  margin-bottom: ${mBot ? 'var(--panel-padding)' : '0'};
  `;

  return /** @type {HTMLDivElement} */ (
    html`<div class="${styles.wrapper}">
      ${hasBgDecoration ? BackgroundDecoration() : ''}
      <section class="${hasAttachment ? styles.panelWithAttachment : styles.panel}" style="${margins}">
        <div class="${styles.topLeft}">${topLeft}</div>
        ${hasHead ? head : ''}
        <div class="${styles.topRight}">${topRight}</div>
        ${hasAttachment ? html`<div class="${styles.topAttachment}">${topAttachment}</div>` : ''}
        <main class="${styles.content}">${content}</main>
        ${hasLogo ? logo : ''}
        <div class="${styles.botRight}">${botRight}</div>
      </section>
    </div>`
  );
}

export { ContentWrapper };
