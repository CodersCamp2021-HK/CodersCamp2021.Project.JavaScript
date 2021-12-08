/**
 * @jest-environment jsdom
 */
import { addUserToRanking, getRankingByCategory } from './ranking';

test('add user to localStorage, category easy', () => {
  expect(addUserToRanking('Tom', 21, 'easy')).toStrictEqual({
    category: 'easy',
    userData: [{ points: 21, username: 'Tom' }],
  });
});

test('add user to localStorage, category hard', () => {
  expect(addUserToRanking('Steve', 14, 'hard')).toStrictEqual({
    category: 'hard',
    userData: [{ points: 14, username: 'Steve' }],
  });
});

test('get users from localStorage, category easy', () => {
  expect(getRankingByCategory('easy')).toBe('{"category":"easy","userData":[{"username":"Tom","points":21}]}');
});

test('get users from localStorage, category hard', () => {
  expect(getRankingByCategory('hard')).toBe('{"category":"hard","userData":[{"username":"Steve","points":14}]}');
});
