import { Home } from './Home/Home';
import { Todo } from './Todo/Todo';
import { Loading } from './Loading/Loading';

const pages = Object.freeze({
  home: Home,
  todo: Todo,
  loading: Loading,
});

/**
 * @typedef {import('../shared').RouterPropsOf<typeof pages>} RouterProps
 */

export { pages };
