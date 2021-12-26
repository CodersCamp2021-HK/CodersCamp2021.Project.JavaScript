import { getByLabelText, getByRole, getByText, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { getRankingByCategory } from '../../shared/ranking';
import { RankingPrompt } from './RankingPrompt';

describe('RankingPrompt tests', () => {
  it('Shows ranking prompt', () => {
    // Given
    const rankingPrompt = RankingPrompt({ score: 3, close: () => {}, category: 'character' });

    // Then
    expect(getByRole(rankingPrompt, 'heading', { name: 'Gratulacje!' })).toBeDefined();
  });

  it('Can be closed', () => {
    // Given
    const close = jest.fn();
    const rankingPrompt = RankingPrompt({ score: 10, close, category: 'mixed' });

    // When
    userEvent.click(getByLabelText(rankingPrompt, 'Zamknij'));

    // Then
    expect(close).toHaveBeenCalledTimes(1);
  });
});
