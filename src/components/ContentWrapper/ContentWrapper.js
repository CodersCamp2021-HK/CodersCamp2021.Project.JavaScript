import { html } from '../../shared';
import headImg from '../../public/img/RicksHead.png';
import logoImg from '../../public/img/RickAndMortyLogo.png';
import { BackgroundDecoration } from '../BackgroundDecoration';
import styles from './ContentWrapper.module.css';

const head = html`<div class="${styles.headWrapper}"><img src="${headImg}" alt="Głowa Ricka." /></div>`;

const logo = html`<div class="${styles.logoWrapper}"><img src="${logoImg}" alt="Logo serialu." /></div>`;

/**
 *
 * @param {{
 *  hasHead?: boolean,
 *  hasLogo?: boolean,
 *  hasBgDecoration?: boolean,
 *  topLeft?: HTMLElement,
 *  topRight?: HTMLElement,
 *  botRight?: HTMLElement,
 *  topAttachment?: HTMLElement,
 *  content: string | HTMLElement
 * }} props
 * @returns {HTMLDivElement}
 */
function ContentWrapper({
  hasHead = false,
  hasLogo = false,
  hasBgDecoration = false,
  topLeft,
  topRight,
  botRight,
  topAttachment,
  content,
}) {
  const mTop = hasHead || topLeft || topRight || topAttachment;
  const mBot = hasLogo || botRight;

  const margins = `
  margin-top: ${mTop ? 'var(--panel-padding)' : '0'};
  margin-bottom: ${mBot ? 'var(--panel-padding)' : '0'};
  `;

  return /** @type {HTMLDivElement} */ (
    html`<div class="${styles.wrapper}">
      ${hasBgDecoration ? BackgroundDecoration() : ''}
      <section class="${topAttachment ? styles.panelWithAttachment : styles.panel}" style="${margins}">
        ${topLeft ? html`<div class="${styles.topLeft}">${topLeft}</div>` : ''} ${hasHead ? head : ''}
        ${topRight ? html`<div class="${styles.topRight}">${topRight}</div>` : ''}
        ${topAttachment ? html`<div class="${styles.topAttachment}">${topAttachment}</div>` : ''}
        <main class="${styles.content}">${content}</main>
        ${hasLogo ? logo : ''} ${botRight ? html`<div class="${styles.botRight}">${botRight}</div>` : ''}
      </section>
    </div>`
  );
}

export { ContentWrapper };
