import { getByRole, getByText, waitFor } from '@testing-library/dom';
import { Loading } from './Loading';

jest.mock('../../data/api', () => ({
  fetchCharacters: jest.fn().mockImplementation(() => []),
  fetchEpisodes: jest.fn().mockImplementation(() => []),
  fetchLocations: jest.fn().mockImplementation(() => []),
}));

function LoadingPageFixture(overrides) {
  const mocks = {
    router: { goto: jest.fn() },
  };
  const sut = Loading({ ...mocks, ...overrides });
  return { mocks, sut };
}

describe('Loading page tests', () => {
  it('Renders the loading page', () => {
    const { sut } = LoadingPageFixture({ selectedCategory: 'character', selectedDifficulty: 'easy' });

    expect(getByRole(sut, 'heading', { name: 'Wybrałeś:' })).toBeDefined();
  });

  it('Navigates to quiz page after loading', async () => {
    const { mocks } = LoadingPageFixture({ selectedCategory: 'character', selectedDifficulty: 'hard' });

    await waitFor(() => expect(mocks.router.goto).toHaveBeenCalledTimes(1), { timeout: 10_000 });
  });

  it('Works for locations', () => {
    const { sut } = LoadingPageFixture({ selectedCategory: 'location', selectedDifficulty: 'hard' });

    expect(getByText(sut, 'Kategoria: bohaterowie z lokacji')).toBeDefined();
  });

  it('Works for episodes', () => {
    const { sut } = LoadingPageFixture({ selectedCategory: 'episode', selectedDifficulty: 'easy' });

    expect(getByText(sut, 'Kategoria: bohaterowie odcinka')).toBeDefined();
  });
});
