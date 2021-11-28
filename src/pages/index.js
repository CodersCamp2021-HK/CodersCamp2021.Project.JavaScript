import { Home } from './Home/Home';
import { Todo } from './Todo/Todo';

const pages = Object.freeze({
  home: Home,
  todo: Todo,
});

/**
 * @typedef {import('../shared').RouterPropsOf<typeof pages>} RouterProps
 */

export { pages };
