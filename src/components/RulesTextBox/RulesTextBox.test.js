import { RulesBox } from './RulesTextBox';

test('add first user to localStorage, new category', () => {
  const renderBox = RulesBox('Opis zasad', 'tutaj beda zasady');
  expect(renderBox.getAttribute('class')).toBe('box');
});
