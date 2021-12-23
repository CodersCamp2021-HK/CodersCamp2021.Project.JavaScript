import { getByRole } from '@testing-library/dom';
import { RulesTextBox } from './RulesTextBox';

describe('RulesTextBox tests', () => {
  it('shows category info', () => {
    // Given
    const renderBox = RulesTextBox({ category: 'character' });

    // Then
    expect(getByRole(renderBox, 'heading', { name: 'O kategorii' })).toBeDefined();
  });

  it('shows difficulty info', () => {
    // Given
    const renderBox = RulesTextBox({ difficulty: 'easy' });

    // Then
    expect(getByRole(renderBox, 'heading', { name: 'O poziomie trudności' })).toBeDefined();
  });
});
