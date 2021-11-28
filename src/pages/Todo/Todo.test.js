import { getByRole, getByText, queryByText } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { Todo } from './Todo';

function TodoPageFixture(overrides) {
  const mocks = {
    router: { goto: jest.fn() },
  };
  const props = {
    id: 12,
  };
  const sut = Todo({ ...mocks, ...props, ...overrides });
  document.body.appendChild(sut);
  return { sut, mocks, props };
}

describe('Todo page tests', () => {
  afterEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('should load previously saved state of todos when render', () => {
    // Given
    const id = 15;
    const key = `todos${id}`;
    const data = ['abcd', 'efg', 'r'.repeat(100)];
    localStorage.setItem(key, JSON.stringify(data));

    // When
    const { sut } = TodoPageFixture({ id });

    // Then
    data.forEach((text) => {
      expect(getByText(sut, text)).toBeDefined();
    });
    expect(getByRole(sut, 'list').children).toHaveLength(data.length);
  });

  it('should add todo li and update local storage when click on add todo', () => {
    // Given
    const { sut } = TodoPageFixture();
    expect(getByRole(sut, 'list').children).toHaveLength(0);
    const text1 = 'q'.repeat(100);
    const clear1 = '{backspace}'.repeat(text1.length);
    const text2 = 'abc'.repeat(10);
    expect(queryByText(sut, text1)).toBeNull();
    expect(queryByText(sut, text2)).toBeNull();

    // When
    userEvent.type(getByRole(sut, 'textbox'), text1);
    userEvent.click(getByRole(sut, 'button', { name: /Add Todo/ }));

    // Then
    expect(getByText(sut, text1)).toBeDefined();
    expect(queryByText(sut, text2)).toBeNull();
    expect(getByRole(sut, 'list').children).toHaveLength(1);

    // When
    userEvent.type(getByRole(sut, 'textbox'), `${clear1}${text2}`);
    userEvent.click(getByRole(sut, 'button', { name: /Add Todo/ }));

    // Then
    expect(getByText(sut, text1)).toBeDefined();
    expect(getByText(sut, text2)).toBeDefined();
    expect(getByRole(sut, 'list').children).toHaveLength(2);
  });

  it('should remove todo li and update local storage when click delete X button', () => {
    // Given
    const { sut } = TodoPageFixture();
    expect(getByRole(sut, 'list').children).toHaveLength(0);
    const todos = ['qwe'.repeat(5), 'lop'.repeat(10)];
    const clear = '{backspace}'.repeat(_.max(todos.map((x) => x.length)));
    todos.forEach((text) => {
      userEvent.type(getByRole(sut, 'textbox'), `${clear}${text}`);
      userEvent.click(getByRole(sut, 'button', { name: /Add Todo/ }));
    });
    expect(getByRole(sut, 'list').children).toHaveLength(2);

    // When
    const li0 = getByText(sut, todos[0]);
    userEvent.click(getByRole(li0, 'button', { name: /X/ }));

    // Then
    expect(queryByText(sut, todos[0])).toBeNull();
    expect(getByText(sut, todos[1])).toBeDefined();
    expect(getByRole(sut, 'list').children).toHaveLength(1);

    // When
    const li1 = getByText(sut, todos[1]);
    userEvent.click(getByRole(li1, 'button', { name: /X/ }));

    // Then
    expect(queryByText(sut, todos[0])).toBeNull();
    expect(queryByText(sut, todos[1])).toBeNull();
    expect(getByRole(sut, 'list').children).toHaveLength(0);
  });

  it('should invoke router.goto when click on Home button', () => {
    // Given
    const { sut, mocks } = TodoPageFixture();
    expect(mocks.router.goto).toHaveBeenCalledTimes(0);

    // When
    userEvent.click(getByRole(sut, 'button', { name: /Home/ }));

    // Then
    expect(mocks.router.goto).toHaveBeenCalledTimes(1);
    expect(mocks.router.goto).toHaveBeenCalledWith({ page: 'home' });
  });

  it('should not create new li if textbox is empty', () => {
    // Given
    const { sut } = TodoPageFixture();
    expect(getByRole(sut, 'list').children).toHaveLength(0);
    expect(getByRole(sut, 'textbox')).toHaveValue('');

    // When
    userEvent.click(getByRole(sut, 'button', { name: /Add Todo/ }));

    // Then
    expect(getByRole(sut, 'list').children).toHaveLength(0);
  });
});
