import { Button, GameTypes } from '../../components';
import { html } from '../../shared';

/**
 * @param {{} & import('..').RouterProps} props
 * @returns
 */
function Home({ router }) {
  const pages = [1, 2, 3, 4, 5];
  return GameTypes({
    heading: 'Wybierz kategorię',
    categories: ['Co to za postać', 'Bohaterowie odcinka', 'Kto tu mieszka', 'Mieszane'],
    role: 'categories',
  });
}

export { Home };
