import { getByRole } from '@testing-library/dom';
import { RankingPrompt } from './RankingPrompt';

function RankingPromptFixture(overrides) {
  const mocks = {
    router: { goto: jest.fn() },
  };
  const sut = RankingPrompt({ ...mocks, ...overrides });
  return { mocks, sut };
}

describe('Ranking prompt page tests', () => {
  it('Shows ranking prompt page', () => {
    const { sut } = RankingPromptFixture({ score: 10 });

    expect(getByRole(sut, 'heading', { name: 'Gratulacje!' })).toBeDefined();
  });
});
