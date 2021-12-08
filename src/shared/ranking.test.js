import { addUserToRanking, getRankingByCategory } from './ranking';

afterAll(() => {
  localStorage.clear();
});

test('add first user to localStorage, new category', () => {
  expect(addUserToRanking('Tom', 21, 'character')).toStrictEqual({
    category: 'character',
    userData: [{ points: 21, username: 'Tom' }],
  });
});

test('add user to localStorage, category character', () => {
  expect(addUserToRanking('John', 28, 'character')).toStrictEqual({
    category: 'character',
    userData: [
      { points: 21, username: 'Tom' },
      { points: 28, username: 'John' },
    ],
  });
});

test("ask for category when it doesn't exist", () => {
  expect(getRankingByCategory('empty')).toStrictEqual({ category: 'empty', userData: [] });
});
