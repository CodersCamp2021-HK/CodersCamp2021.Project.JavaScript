import { html } from '../../shared';
import { RankingTable } from '../../components';
import styles from './EmptyPage.module.css';

function EmptyPage() {
  return html`<div class="${styles.center}">
    <h1 style="color:white">Empty page, tabela</h1>
    ${RankingTable()}
  </div>`;
}

export { EmptyPage };
