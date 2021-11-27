import _ from 'lodash';
import { render, html as htmlLiteral, unsafe } from './Dom';

describe('render tests', () => {
  function elementWithParentNode() {
    const parent = document.createElement('div');
    parent.setAttribute('data-testid', 'parent');
    const element = document.createElement('div');
    element.setAttribute('data-testid', 'element');
    parent.appendChild(element);
    return { parent, element };
  }

  it.each([
    [{ html: `<a/>`, element: document.createElement('a') }],
    [{ html: `<a/>`, factory: () => document.createElement('a') }],
    [{ element: document.createElement('a'), factory: () => document.createElement('a') }],
  ])('should throw if more than one overload requested %s', (params) => {
    // Given
    const { element, parent } = elementWithParentNode();

    // When
    // @ts-ignore
    const fn = () => render({ ...params, on: element });

    // Then
    expect(fn).toThrow();
    expect(parent).toContainElement(element);
    expect(parent.childElementCount).toBe(1);
  });

  it(`should throw if "on" isn't a element`, () => {
    // Given
    const on = {};
    const html = `<a/>`;

    // When
    // @ts-ignore
    const fn = () => render({ html, on });

    // Then
    expect(fn).toThrow();
  });

  it(`should throw if "selector" isn't a string`, () => {
    // Given
    const on = document.createElement('a');
    const html = `<a/>`;
    const selector = {};

    // When
    // @ts-ignore
    const fn = () => render({ html, on, selector });

    // Then
    expect(fn).toThrow();
  });

  it.each([[{ html: 12 }], [{ html: `<>` }], [{ element: {} }], [{ factory: () => {} }]])(
    `should throw if "params" are invalid %s`,
    (params) => {
      // Given
      const { element, parent } = elementWithParentNode();

      // When
      // @ts-ignore
      const fn = () => render({ ...params, on: element });

      // Then
      expect(fn).toThrow();
      expect(parent).toContainElement(element);
      expect(parent.childElementCount).toBe(1);
    },
  );

  describe('given valid params', () => {
    const validParams = [
      [{ html: `<a/>` }],
      [{ element: document.createElement('a') }],
      [{ factory: () => document.createElement('a') }],
    ];

    const unwrap = (elem) => (_.isArray(elem) && elem.length === 1 ? elem[0] : elem);

    // @ts-ignore
    it.each(validParams)(`should throw if "on" doesn't have parentNode %s`, (params) => {
      // Given
      const on = document.createElement('div');

      // When
      // @ts-ignore
      const fn = () => render({ ...params, on });

      // Then
      expect(fn).toThrow();
    });

    // @ts-ignore
    it.each(validParams)(`should render "a" if "on" have parentNode %s`, (params) => {
      // Given
      const { element: on, parent } = elementWithParentNode();

      // When
      // @ts-ignore
      const element = render({ ...params, on });

      // Then
      expect(parent).toContainElement(unwrap(element));
      expect(parent).not.toContainElement(on);
      expect(parent.childElementCount).toBe(1);
    });

    // @ts-ignore
    it.each(validParams)(`should throw if "selector" is invalid %s`, (params) => {
      // Given
      const { element, parent: on } = elementWithParentNode();
      const selector = 'a[data-testid="element"]';
      expect(on.querySelector(selector)).toBeNull();

      // When
      // @ts-ignore
      const fn = () => render({ ...params, on, selector });

      // Then
      expect(fn).toThrow();
      expect(on).toContainElement(element);
      expect(on.childElementCount).toBe(1);
    });

    // @ts-ignore
    it.each(validParams)(`should render "a" if "on" and "selector" are valid %s`, (params) => {
      // Given
      const { element: child, parent: on } = elementWithParentNode();
      const selector = 'div[data-testid="element"]';
      expect(on.querySelector(selector)).toBe(child);

      // When
      // @ts-ignore
      const element = render({ ...params, on, selector });

      // Then
      expect(on).toContainElement(unwrap(element));
      expect(on).not.toContainElement(child);
      expect(on.childElementCount).toBe(1);
    });
  });

  it('should rerender every element specifed by "selector" using given "factory"', () => {
    // Given
    const selector = 'li';
    const ul = htmlLiteral`<ul>
      <li>Text 1</li>
      <li>Text 2</li>
      <li>Text 3</li>
      </ul>`;
    expect(ul.querySelectorAll(selector)).toHaveLength(3);
    const expectedText = 'cf0ee23c-05a6-4fb2-9490-67e2d0b25d9b';
    const factory = () => {
      const newElem = document.createElement('li');
      newElem.textContent = expectedText;
      return newElem;
    };

    // When
    const elements = render({ factory, on: ul, selector });

    // Then
    elements.forEach((element) => expect(element).toContainHTML(`<li>${expectedText}</li>`));
    expect(ul).toContainHTML(`<ul>
      <li>${expectedText}</li>
      <li>${expectedText}</li>
      <li>${expectedText}</li>
      </ul>`);
  });
});

describe('html tests', () => {
  it('should create new element from html', () => {
    // Given
    const expected = `<span data-testid="parent">
          Text2
          <span data-testid="child">
              Text
          </span>
      </span>`;

    // When
    const element = htmlLiteral`<span data-testid="parent">
          Text2
          <span data-testid="child">
              Text
          </span>
      </span>`;

    // Then
    expect(element).toContainHTML(expected);
  });

  it('should create new element with data', () => {
    // Given
    const data = { param1: 'foo', param2: 'parent', param3: 'Text2', param4: 'boo', param5: 'child', param6: 'Text' };
    const html = `<span class="${data.param1}" data-testid="${data.param2}">
          ${data.param3}
          <span class="${data.param4}" data-testid="${data.param5}">
            ${data.param6}
          </span>
      </span>`;

    // When
    const element = htmlLiteral`<span class="${data.param1}" data-testid="${data.param2}">
          ${data.param3}
          <span class="${data.param4}" data-testid="${data.param5}">
            ${data.param6}
          </span>
      </span>`;

    // Then
    expect(element).toContainHTML(html);
  });

  it('should create new element with embeded html', () => {
    // Given
    const data = { param1: 'foo', param2: 'parent', param3: 'Text2', param4: 'boo', param5: 'child', param6: 'Text' };
    const html = `<span class="${data.param1}" data-testid="${data.param2}">
          ${data.param3}
          <span class="${data.param4}" data-testid="${data.param5}">
            ${data.param6}
          </span>
      </span>`;

    // When
    const embeded = htmlLiteral`<span class="${data.param4}" data-testid="${data.param5}">
            ${data.param6}
          </span>`;
    const element = htmlLiteral`<span class="${data.param1}" data-testid="${data.param2}">
          ${data.param3}
          ${embeded}
      </span>`;

    // Then
    expect(element).toContainHTML(html);
  });

  it('should create new element serializing object when given object', () => {
    // Given
    const data = { param1: 'foo', param2: 'parent', param3: 'Text2', param4: 'boo', param5: 'child', param6: 'Text' };
    const html = `<span class="${data.param1}" data-testid="${data.param2}">
          ${JSON.stringify(data)}
      </span>`;

    // When
    const element = htmlLiteral`<span class="${data.param1}" data-testid="${data.param2}">
          ${data}
      </span>`;

    // Then
    expect(element).toContainHTML(html);
  });

  it('should create new element escaping html when given raw html', () => {
    // Given
    const data = { param1: '<div><span> Text1 </span></div>', param2: '<span> Text2 </span>' };
    const html = `<div>
          ${_.escape(data.param1)}
          ${_.escape(data.param2)}
      </div>`;

    // When
    const element = htmlLiteral`<div>
          ${data.param1}
          ${data.param2}
      </div>`;

    // Then
    expect(element).toContainHTML(html);
  });

  it('should create new element with unsafe html when given unsafe(raw html)', () => {
    // Given
    const data = { param1: '<div><span> Text1 </span></div>', param2: '<span> Text2 </span>' };
    const html = `<div>
          ${data.param1}
          ${data.param2}
      </div>`;

    // When
    const element = htmlLiteral`<div>
          ${unsafe(data.param1)}
          ${unsafe(data.param2)}
      </div>`;

    // Then
    expect(element).toContainHTML(html);
  });

  it('should create new element with array', () => {
    // Given
    const data = ['text1', 'text2', 'text3', 'text4'];
    const html = `<span>
        ${data.join(' ')}
      </span>`;

    // When
    const element = htmlLiteral`<span>
        ${data}
      </span>`;

    // Then
    expect(element).toContainHTML(html);
  });

  it('should create new element with element array', () => {
    // Given
    const data = ['text1', 'text2', 'text3', 'text4'];
    const html = `<ul>
        ${data.map((x) => `<li>${x}</li>`).join(' ')}
      </ul>`;

    // When
    const element = htmlLiteral`<ul>
        ${data.map((x) => htmlLiteral`<li>${x}</li>`)}
      </ul>`;

    // Then
    expect(element).toContainHTML(html);
  });
});
