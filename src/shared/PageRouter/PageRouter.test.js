import { getByLabelText, getByText, queryByLabelText, queryByText } from '@testing-library/dom';
import { PageRouter } from './PageRouter';

/**
 * @param {{[x: string] : import('./PageRouter').AnyPageFactory}} overrides
 */
function PageRouterFixture(overrides = {}) {
  const mocks = {
    page1: jest.fn(),
    page2: jest.fn(),
  };
  const root = document.createElement('div');
  const sut = new PageRouter({ ...mocks, ...overrides }, root);
  return { mocks, sut, root };
}

describe('PageRouter tests', () => {
  it('should render page into root with given data', () => {
    // Given
    const { sut, root, mocks } = PageRouterFixture();
    const props1 = { router: sut, label: 'page-12', text: 'Page 1' };
    const props2 = { router: sut, text: 'Page 2' };
    mocks.page1.mockImplementationOnce((props) => {
      const elem = document.createElement('span');
      elem.textContent = props.text;
      elem.setAttribute('aria-label', props.label);
      return elem;
    });
    mocks.page2.mockImplementationOnce((props) => {
      const elem = document.createElement('span');
      elem.textContent = props.text;
      return elem;
    });
    expect(mocks.page1).toHaveBeenCalledTimes(0);
    expect(mocks.page2).toHaveBeenCalledTimes(0);
    expect(root.children).toHaveLength(0);
    expect(queryByText(root, props2.text)).toBeNull();
    expect(queryByLabelText(root, props1.label)).toBeNull();
    expect(queryByText(root, props1.text)).toBeNull();

    // When
    // @ts-ignore
    sut.goto({ page: 'page1', data: props1 });

    // Then
    expect(mocks.page1).toHaveBeenCalledTimes(1);
    expect(mocks.page2).toHaveBeenCalledTimes(0);
    expect(mocks.page1).toHaveBeenCalledWith(props1);
    expect(root.children).toHaveLength(1);
    expect(root.firstElementChild).toBe(getByLabelText(root, props1.label));
    expect(root.firstElementChild).toBe(getByText(root, props1.text));
    expect(queryByText(root, props2.text)).toBeNull();

    // When
    // @ts-ignore
    sut.goto({ page: 'page2', data: props2 });

    // Then
    expect(mocks.page1).toHaveBeenCalledTimes(1);
    expect(mocks.page2).toHaveBeenCalledTimes(1);
    expect(mocks.page2).toHaveBeenCalledWith(props2);
    expect(root.children).toHaveLength(1);
    expect(root.firstElementChild).toBe(getByText(root, props2.text));
    expect(queryByLabelText(root, props1.label)).toBeNull();
    expect(queryByText(root, props1.text)).toBeNull();
  });

  it('should throw if invalid page name', () => {
    // Given
    const { sut, root } = PageRouterFixture();
    const invalidPage = 'notexists';
    expect(root.children).toHaveLength(0);

    // When
    // @ts-ignore
    const fn = () => sut.goto({ page: invalidPage });

    // Then
    expect(fn).toThrow();
    expect(root.children).toHaveLength(0);
  });

  it('should not rerender when page fn throw', () => {
    // Given
    const { sut, root, mocks } = PageRouterFixture();
    expect(root.children).toHaveLength(0);
    mocks.page1.mockImplementationOnce(() => {
      throw new Error();
    });

    // When
    // @ts-ignore
    const fn = () => sut.goto({ page: 'page1' });

    // Then
    expect(fn).toThrow();
    expect(root.children).toHaveLength(0);
    expect(mocks.page1).toHaveBeenCalledTimes(1);
  });
});
