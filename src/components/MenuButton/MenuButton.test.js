import userEvent from '@testing-library/user-event';
import { MenuButton } from './MenuButton';

describe('MenuButton tests', () => {
  it('should render text', () => {
    // Given
    const text = 'Test';
    const menuButton = MenuButton({ text, onClick: () => {} });

    // Then
    expect(menuButton.textContent.trim()).toBe(text);
  });

  it('should handle clicks', () => {
    // Given
    const onClick = jest.fn();
    const menuButton = MenuButton({ text: 'Click!', onClick, variant: 'outlined' });
    expect(onClick).toHaveBeenCalledTimes(0);

    // When
    userEvent.click(menuButton);

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    // Given
    const onClick = jest.fn();
    const menuButton = MenuButton({ text: 'Disabled button', onClick, disabled: true });

    // When
    userEvent.click(menuButton);

    // Then
    expect(menuButton.disabled).toBe(true);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
