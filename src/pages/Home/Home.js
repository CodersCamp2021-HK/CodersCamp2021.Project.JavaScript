import { Input } from '../../components';
import { html } from '../../shared';

/**
 * @param {{} & import('..').RouterProps} props
 * @returns
 */
function Home({ router }) {
  const playerName = null;

  return html`<div class="vstack">
    <h2>Home</h2>
    ${Input({
      onChange: () => {},
    })}
  </div>`;
}

export { Home };
