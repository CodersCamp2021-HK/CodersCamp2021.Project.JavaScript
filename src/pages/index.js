import { Home } from './Home';
import { Todo } from './Todo';
import { Loading } from './Loading';
import { Quiz } from './Quiz';
import { RankingPrompt } from './RankingPrompt';

const pages = Object.freeze({
  home: Home,
  todo: Todo,
  loading: Loading,
  quiz: Quiz,
  rankingPrompt: RankingPrompt,
});

/**
 * @typedef {import('../shared').RouterPropsOf<typeof pages>} RouterProps
 */

export { pages };
