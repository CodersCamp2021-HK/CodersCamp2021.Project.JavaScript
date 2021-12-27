import { addUserToRanking, getRankingByCategory } from './ranking';

beforeAll(() => {
  localStorage.clear();
});

afterAll(() => {
  localStorage.clear();
});

test('add first user to localStorage, new category', () => {
  expect(addUserToRanking('Tom', 21, 'character', 1234)).toStrictEqual({
    category: 'character',
    userData: [{ points: 21, username: 'Tom', id: 1234 }],
  });
});

test('add user to localStorage, category character', () => {
  expect(addUserToRanking('John', 28, 'character', 123456)).toStrictEqual({
    category: 'character',
    userData: [
      { points: 21, username: 'Tom', id: 1234 },
      { points: 28, username: 'John', id: 123456 },
    ],
  });
});

test("ask for category when it doesn't exist", () => {
  expect(getRankingByCategory('empty')).toStrictEqual({ category: 'empty', userData: [] });
});
