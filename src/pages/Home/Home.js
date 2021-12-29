import { Button, GameTypes, RulesTextBox } from '../../components';
import { html, render } from '../../shared';
import rickAndMorty from '../../public/img/HomeRickAndMorty.png';
import styles from './Home.module.css';

/**
 * @param {{} & import('..').RouterProps} props
 * @returns
 */
function Home({ router }) {
  let selectedCategory = null;
  let selectedDifficulty = null;

  const rulesWrapper = html`<div class="${styles.hide}">${RulesTextBox()}</div>`;

  const btnStart = Button({
    text: 'Rozpocznij quiz',
    variant: 'main',
    disabled: true,
    onClick: () => {
      router.goto({ page: 'loading', data: { selectedCategory, selectedDifficulty } });
    },
  });

  const onGameOptionSelect = () => {
    const shouldBeDisabled = selectedCategory === null || selectedDifficulty === null;
    btnStart.disabled = shouldBeDisabled;

    rulesWrapper.className = styles.show;
    render({
      element: RulesTextBox({
        category: selectedCategory,
        difficulty: selectedDifficulty,
      }),
      on: rulesWrapper.firstElementChild,
    });
  };

  return html`<div class="${styles.wrapper}">
    <section class="${styles.homeSection}">
      <div class="${styles.image}">
        <img src="${rickAndMorty}" alt="Rick and Morty" />
        ${rulesWrapper}
      </div>
      <div>
      <div>
        ${GameTypes({
          onSelect: (selected) => {
            selectedCategory = selected.id;
            onGameOptionSelect();
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

      <div class = "${styles.difficult}">
        ${GameTypes({
          onSelect: (selected) => {
            selectedDifficulty = selected.id;
            onGameOptionSelect();
          },
          heading: 'Wybierz poziom',
          categories: [
            { id: 'easy', text: 'Łatwy' },
            { id: 'hard', text: 'Trudny' },
          ],
          layout: 'halfWidth',
        })}
      </div>
      <div class = "${styles.startBtn}">
      ${btnStart}
      ${Button({
        text: 'Ranking',
        onClick: () => {
          router.goto({ page: 'ranking' });
        },
        variant: 'outlined',
      })}
      </div>
    </section>
  </div></div>`;
}

export { Home };
