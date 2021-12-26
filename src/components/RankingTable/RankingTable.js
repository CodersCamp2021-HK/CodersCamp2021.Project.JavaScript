import styles from './RankingTable.module.css';
import { getRankingByCategory } from '../../shared/ranking';
import { html } from '../../shared';
import blob from '../../public/img/blob.svg';

/**
 * @typedef {'character' | 'episode' | 'location' | 'mixed'} QuizCategory
 */

/**
 * Create Ranking Table
 * @param {{ id?: number, category: QuizCategory }} props param id get from the page and set as Date.now().
 * @returns {HTMLElement}
 */

function RankingTable({ id, category }) {
  const items = getRankingByCategory(category).userData;
  items.sort(function sort(a, b) {
    return b.points - a.points;
  });

  const rankingDiv = document.createElement('div');
  rankingDiv.className = styles.rankingContainer;
  const table = document.createElement('table');
  const tableHeader = html`<table>
    <thead>
      <th>Nr</th>
      <th>Nazwa gracza</th>
      <th>Punkty</th>
    </thead>
  </table>`.firstElementChild;

  table.appendChild(tableHeader);

  const names = items.map((e) => e.username);
  const points = items.map((e) => e.points);
  const saveTime = items.map((e) => e.id);
  let featuredScore = null;
  for (let i = 0; i < items.length; i += 1) {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    const text1 = document.createTextNode(`${i + 1}`);
    const text2 = document.createTextNode(names[i]);
    const text3 = document.createTextNode(`${points[i]}`);
    if (saveTime[i] === id) {
      tr.className = styles.userScore;
      td1.className = styles.blobBox;
      featuredScore = html`<div class="${styles.blobBox}">
        <img src="${blob}" alt="" />
        <span class="${styles.userPosition}">${i + 1}</span>
      </div>`;
      td1.appendChild(featuredScore);
    } else {
      td1.appendChild(text1);
    }

    td2.appendChild(text2);
    td3.appendChild(text3);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    table.appendChild(tr);
  }
  if (featuredScore !== null) {
    setTimeout(() => {
      featuredScore.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 0);
  }

  rankingDiv.appendChild(table);
  return rankingDiv;
}

export { RankingTable };
