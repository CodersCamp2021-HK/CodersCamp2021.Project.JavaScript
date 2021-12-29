import { html, render } from '../../shared';
import styles from './Ranking.module.css';

/**
 * @param {{} & import('..').RouterProps} props
 * @returns
 */
function Ranking({ router }) {
  return html` <div class=${styles.content}>
    <div class=${styles.flexContainer}>
      <button class=${styles.flexBtn}>Co to za postać</button>
      <button class=${styles.flexBtn}>Bohaterowie odcinka</button>
      <button class=${styles.flexBtn}>Kto tu mieszka</button>
      <button class=${styles.flexBtn}>Mieszane</button>
    </div>
    <div class=${styles.rectangle}></div>
  </div>`;
}

export { Ranking };
