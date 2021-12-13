import { RulesTextBox } from './RulesTextBox';

test('Check if element appears on the page', () => {
  const renderBox = RulesTextBox('Opis zasad', 'tutaj beda zasady');
  expect(renderBox.getAttribute('class')).toBe('box');
});
