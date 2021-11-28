import userEvent from '@testing-library/user-event';
import { Button } from './Button';

function ButtonFixture(overrides) {
  const mocks = {
    onClick: jest.fn(),
  };
  const props = {
    text: 'Click',
  };
  const sut = Button({ ...mocks, ...props, ...overrides });
  return { mocks, props, sut };
}

describe('Button tests', () => {
  it('should have type="button', () => {
    // Given
    const { sut } = ButtonFixture();

    // Then
    expect(sut).toHaveAttribute('type', 'button');
  });

  it('should work with text props', () => {
    // Given
    const { sut, props } = ButtonFixture();

    // Then
    expect(sut.textContent).toBe(props.text);
  });

  it('should work with onClick props', () => {
    // Given
    const { sut, mocks } = ButtonFixture();
    expect(mocks.onClick).toHaveBeenCalledTimes(0);

    // When
    userEvent.click(sut);

    // Then
    expect(mocks.onClick).toHaveBeenCalledTimes(1);
  });
});
