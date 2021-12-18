import { Button } from '../../components';
import { html } from '../../shared';

/**
 * @param {{} & import('..').RouterProps} props
 * @returns
 */
function Home({ router }) {
  const pages = [1, 2, 3, 4, 5];
  return html`<div class="vstack">
    <h2>Home</h2>
    ${pages.map((x) =>
      Button({
        onClick: (e) => {
          e.preventDefault();
          router.goto({ page: 'todo', data: { id: x } });
        },
        text: `Go to page ${x}`,
        variant: 'normal',
      }),
    )}
  </div>`;
}

export { Home };
