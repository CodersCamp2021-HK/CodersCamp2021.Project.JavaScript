import { getAllByText, getByRole } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Home } from './Home';

function HomePageFixture(overrides) {
  const mocks = {
    router: { goto: jest.fn() },
  };
  const sut = Home({ ...mocks, ...overrides });
  return { mocks, sut };
}

describe('Home page tests', () => {
  it('should render Home header', () => {
    // Given
    const { sut } = HomePageFixture();

    // Then
    expect(getByRole(sut, 'heading', { name: /Home/ })).toBeDefined();
  });

  it('should render 5 buttons with text "Go to page $x"', () => {
    // Given
    const { sut } = HomePageFixture();

    // Then
    const btns = getAllByText(sut, /Go to page/);
    expect(btns).toHaveLength(5);
  });

  it('should invoke router.goto when click on button with number 3', () => {
    // Given
    const { sut, mocks } = HomePageFixture();
    expect(mocks.router.goto).toHaveBeenCalledTimes(0);

    // When
    const btn = getByRole(sut, 'button', { name: /Go to page 3/ });
    userEvent.click(btn);

    // Then
    expect(mocks.router.goto).toHaveBeenCalledTimes(1);
    expect(mocks.router.goto).toHaveBeenCalledWith({
      page: 'todo',
      data: { id: 3 },
    });
  });
});
