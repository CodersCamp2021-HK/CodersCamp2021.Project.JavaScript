import { Button, GameTypes, RulesTextBox } from '../../components';
import { html } from '../../shared';
import rickAndMorty from '../../public/img/HomeRickAndMorty.png';
import styles from './Home.module.css';

/**
 * @param {{} & import('..').RouterProps} props
 * @returns
 */

function Home({ router }) {
  let selectedCategory = null;
  let selectedDifficulty = null;
  console.log(selectedDifficulty);
  console.log(selectedCategory);

  const btnStart = Button({
    text: 'Rozpocznij quiz',
    disabled: true,
    onClick: () => {
      router.goto({ page: 'loading', data: { selectedCategory, selectedDifficulty } });
    },
  });

  const updateButtonDisabledState = () => {
    const shouldBeDisabled = selectedCategory === null || selectedDifficulty === null;
    btnStart.disabled = shouldBeDisabled;
  };

  return html`<div class="${styles.wrapper}">
    <section>
      <div>
      <img class="${styles.image}" src="${rickAndMorty}" alt="Rick and Morty" />
      </div>
      <div>
      <div>
        ${GameTypes({
          onSelect: (selected) => {
            selectedCategory = selected.id;
            console.log(selectedCategory);
            updateButtonDisabledState();
          },
          heading: 'Wybierz kategorię',
          categories: [
            { id: 'character', text: 'Co to za postać' },
            { id: 'episode', text: 'Bohaterowie odcinka' },
            { id: 'location', text: 'Kto tu mieszka' },
            { id: 'mixed', text: 'Mieszane' },
          ],
        })}
      </div>

      <div>
        ${GameTypes({
          onSelect: (selected) => {
            selectedDifficulty = selected.id;
            console.log(selectedDifficulty);
            updateButtonDisabledState();
          },
          heading: 'Wybierz poziom',
          categories: [
            { id: 'easy', text: 'Łatwy' },
            { id: 'hard', text: 'Trudny' },
          ],
          layout: 'halfWidth',
        })}
      </div>
      <div class = ${styles.sth}>
      ${btnStart}
      ${Button({
        text: 'Ranking',
        onClick: () => {},
        variant: 'outlined',
      })}
      </div>
    </section>
  </div></div>`;
}

export { Home };
