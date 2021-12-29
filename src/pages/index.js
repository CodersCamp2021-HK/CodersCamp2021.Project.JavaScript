import { Home } from './Home';
import { Loading } from './Loading';
import { Quiz } from './Quiz';
import { Answers } from './Answers';
import { Ranking } from './Ranking';

const pages = Object.freeze({
  home: Home,
  loading: Loading,
  quiz: Quiz,
  answers: Answers,
  ranking: Ranking,
});

/**
 * @typedef {import('../shared').RouterPropsOf<typeof pages>} RouterProps
 */

export { pages };
