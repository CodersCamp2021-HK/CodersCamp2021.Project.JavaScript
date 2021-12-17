import { html } from '../../shared';
import styles from './QuestionCounter.module.css';
import blob from '../../public/img/blob.svg';

/**
 * @param {{ initialCount?: number }} props
 * @returns {{ element: HTMLElement, increment: () => void, getCount: () => number }}
 */
function QuestionCounter({ initialCount = 1 } = {}) {
  let count = initialCount;

  const countElement = html`<span class="${styles.count}">${count}</span>`;

  const increment = () => {
    count += 1;
    countElement.innerText = count.toString();
  };

  const getCount = () => count;

  const element = html`<div class="${styles.blobBox}">
    <img src="${blob}" alt="" />
    ${countElement}
  </div>`;

  return {
    element,
    increment,
    getCount,
  };
}

export { QuestionCounter };
