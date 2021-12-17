import { Home } from './Home/Home';
import { Todo } from './Todo/Todo';
import { Loading } from './Loading/Loading';
import { Quiz } from './Quiz/Quiz';

const pages = Object.freeze({
  home: Home,
  todo: Todo,
  loading: Loading,
  quiz: Quiz,
});

/**
 * @typedef {import('../shared').RouterPropsOf<typeof pages>} RouterProps
 */

export { pages };
