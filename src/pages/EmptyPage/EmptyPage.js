import { html } from '../../shared';
import { RankingTable } from '../../components';
import styles from './EmptyPage.module.css';
import { addUserToRanking } from '../../shared/ranking';

/**
 * @param { { now: number } & import('..').RouterProps } props
 */

function EmptyPage({ now }) {
  const showElem = html`<div>${RankingTable(now, 'mixed')}</div>`;
  const elem = showElem.getElementById('change-color').scrollIntoView({ behavior: 'smooth', block: 'center' });
  return html`<div class="${styles.center}">${showElem}}</div>`;
}

export { EmptyPage };
