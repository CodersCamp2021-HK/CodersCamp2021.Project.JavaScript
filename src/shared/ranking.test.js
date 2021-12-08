/**
 * @jest-environment jsdom
 */
import { addUserToRanking, getRankingByCategory } from './ranking';

test("add user to localStorage when category easy doesn't exist", () => {
  expect(addUserToRanking('Tom', 21, 'easy')).toStrictEqual({
    category: 'easy',
    userData: [{ points: 21, username: 'Tom' }],
  });
});

test("add user to localStorage when category hard doesn't exist", () => {
  expect(addUserToRanking('Steve', 14, 'hard')).toStrictEqual({
    category: 'hard',
    userData: [{ points: 14, username: 'Steve' }],
  });
});

test('add user to localStorage, category hard', () => {
  expect(addUserToRanking('John', 28, 'hard')).toStrictEqual({
    category: 'hard',
    userData: [
      { points: 14, username: 'Steve' },
      { points: 28, username: 'John' },
    ],
  });
});

test('get users from localStorage, category easy', () => {
  expect(getRankingByCategory('easy')).toBe('{"category":"easy","userData":[{"username":"Tom","points":21}]}');
});

test('get users from localStorage, category hard', () => {
  expect(getRankingByCategory('hard')).toBe(
    '{"category":"hard","userData":[{"username":"Steve","points":14},{"username":"John","points":28}]}',
  );
});

test("ask for category when it doesn't exist", () => {
  expect(getRankingByCategory('empty')).toBeFalsy();
});
