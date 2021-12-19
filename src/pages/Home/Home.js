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

  const rulesBox = RulesTextBox('', '');

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
    document.getElementById('rules').className = styles.show;
  };

  const updateRulesTextBox = (header, rules) => {
    const h3 = document.getElementById('rules').getElementsByTagName('h3')[0];
    const p = document.getElementById('rules').getElementsByTagName('p')[0];
    h3.textContent = header;
    p.textContent = rules;
  };

  return html`<div class="${styles.wrapper}">
    <section>
      <div class="${styles.image}">
      <img  src="${rickAndMorty}" alt="Rick and Morty" />
      <div class="${styles.hide}" id='rules'>
      ${rulesBox}
      </div>
      </div>
      <div>
      <div>
        ${GameTypes({
          onSelect: (selected) => {
            selectedCategory = selected.id;
            updateButtonDisabledState();
            if (selectedCategory === 'character') {
              updateRulesTextBox(
                'Opis kategori',
                'Co to za postac. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              );
            } else if (selectedCategory === 'episode') {
              updateRulesTextBox(
                'Opis kategori',
                'Bohaterowie odc. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              );
            } else if (selectedCategory === 'location') {
              updateRulesTextBox(
                'Opis kategori',
                'Kto tu mieszka. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              );
            } else if (selectedCategory === 'mixed') {
              updateRulesTextBox(
                'Opis kategori',
                'Poziom mieszany. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              );
            }
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
            updateButtonDisabledState();
            if (selectedDifficulty === 'easy') {
              updateRulesTextBox(
                'Opis poziomu',
                'Poziom łatwy. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              );
            } else if (selectedDifficulty === 'hard') {
              updateRulesTextBox(
                'Opis poziomu',
                'Poziom trudny. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              );
            }
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
        onClick: () => {},
        variant: 'outlined',
      })}
      </div>
    </section>
  </div></div>`;
}

export { Home };
