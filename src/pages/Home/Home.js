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
      <div class="${styles.image}">
      <img  src="${rickAndMorty}" alt="Rick and Morty" />
      <div class="${styles.hide}" id='rules'>
      ${RulesTextBox(
        'zasady',
        'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing andWhat is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and',
      )};
      </div>
      </div>
      <div>
      <div>
        ${GameTypes({
          onSelect: (selected) => {
            selectedCategory = selected.id;
            updateButtonDisabledState();
            if (selectedCategory === 'mixed') {
              document.getElementById('rules').className = styles.show;
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
