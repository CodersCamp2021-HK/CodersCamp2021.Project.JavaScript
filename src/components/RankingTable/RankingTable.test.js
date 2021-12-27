// import userEvent from '@testing-library/user-event';
import { RankingTable } from './RankingTable';

import { addUserToRanking } from '../../shared/ranking';

afterAll(() => {
  localStorage.clear();
});

describe('RankingTable test', () => {
  it('should render RankingTable with record', () => {
    // Given
    addUserToRanking('Tom', 21, 'character', 1234);
    const createRankingTable = RankingTable({ category: 'character' });

    // Then
    expect(createRankingTable.contains(createRankingTable)).toBe(true);
  });
});
