import userEvent from '@testing-library/user-event';
import { PopupClose } from './PopupClose';

describe('PopupClose tests', () => {
  it('should handle clicks', () => {
    // Given
    const onClick = jest.fn();
    const popupClose = PopupClose({ onClick });
    expect(onClick).toHaveBeenCalledTimes(0);

    // When
    userEvent.click(popupClose);

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
