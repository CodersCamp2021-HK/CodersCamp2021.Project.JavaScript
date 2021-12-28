import { Home } from './Home';
import { Loading } from './Loading';
import { Quiz } from './Quiz';
import { Answers } from './Answers';

const pages = Object.freeze({
  home: Home,
  loading: Loading,
  quiz: Quiz,
  answers: Answers,
});

/**
 * @typedef {import('../shared').RouterPropsOf<typeof pages>} RouterProps
 */

export { pages };
