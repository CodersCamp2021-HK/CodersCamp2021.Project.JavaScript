import styles from './RankingTable.module.css';
import { getRankingByCategory } from '../../shared/ranking';
import { html } from '../../shared';
import blob from '../../public/img/blob.svg';

function RankingTable(id, category) {
  const items = getRankingByCategory(category).userData;
  items.sort(function sorted(a, b) {
    return b.points - a.points;
  });
  const rankingDiv = document.createElement('div');
  rankingDiv.className = styles.rankingContainer;
  const table = document.createElement('table');
  const tableHeader = document.createElement('thead');
  tableHeader.className = 'tableHeader';

  const userPosition = document.createElement('th');
  const userName = document.createElement('th');
  const score = document.createElement('th');
  userPosition.appendChild(document.createTextNode('Nr'));
  userName.appendChild(document.createTextNode('Nazwa gracza'));
  score.appendChild(document.createTextNode('Punkty'));
  table.appendChild(tableHeader);
  tableHeader.appendChild(userPosition);
  tableHeader.appendChild(userName);
  tableHeader.appendChild(score);
  const names = items.map((e) => e.username);
  const points = items.map((e) => e.points);
  const saveTime = items.map((e) => e.dateTime);
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
      td1.appendChild(html`<div class="${styles.blobBox}">
        <img src="${blob}" alt="" />
        <span class="${styles.userPosition}">${i + 1}</span>
      </div>`);
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
  rankingDiv.appendChild(table);

  return rankingDiv;
}

export { RankingTable };
