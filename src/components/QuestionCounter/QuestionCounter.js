import { html } from '../../shared';
import styles from './QuestionCounter.module.css';
import blob from '../../public/img/blob.svg';

/**
 * @typedef {Object} QuestionCounterInstance Object wrapping the HTML `element` and containing additional utility functions.
 * @property {HTMLElement} element The actual HTML element, which should be put in the tree. It re-renders automatically.
 * @property {() => void} increment Function, which increases the counter by 1 and re-renders the count.
 * @property {() => number} getCount Function, returning current count stored in the counter.
 */

/**
 * @param {{initialCount?: number}} props
 * @returns {QuestionCounterInstance} object containing `element`, `increment` and `getCount`
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
