import { html } from '../../shared';
import styles from './Ranking.module.css';
import { RankingTable, Button } from '../../components';

/**
 * @param {{} & import('..').RouterProps} props
 * @returns
 */
function Ranking({ router }) {
  const homeBtn = Button({
    text: 'Wróć do ekranu startowego',
    variant: 'normal',
    onClick: () => {
      router.goto({ page: 'home' });
    },
  });
  return html` <div class=${styles.content}>
    {}
    <div class=${styles.flexContainer}>
      <button class=${styles.flexBtn}>Co to za postać</button>
      <button class=${styles.flexBtn}>Bohaterowie odcinka</button>
      <button class=${styles.flexBtn}>Kto tu mieszka</button>
      <button class=${styles.flexBtn}>Mieszane</button>
    </div>
    <div class=${styles.rectangle}>
      <h1 class=${styles.text}>Ranking</h1>
      <div class=${styles.table}>${RankingTable({ category: 'mixed' })}</div>
      <div class=${styles.homeBtn}>${homeBtn}</div>
    </div>
  </div>`;
}

export { Ranking };
