import _ from 'lodash';

/**
 *
 * @param {{ html: string}} props
 * @returns {HTMLElement}
 */
function elementFrom({ html }) {
  if (!_.isString(html)) {
    throw new Error('Invalid argument "html", expected string');
  }
  const template = document.createElement('div');
  template.innerHTML = html.trim();
  const result = template.firstElementChild;
  if (result === null) {
    throw new Error(`Invalid "html" format: ${html.trim()}`);
  }
  // @ts-ignore
  return result;
}

function renderElement({ element, on, selector }) {
  if (!_.isElement(element)) {
    throw new Error('Invalid argument "element", expected HTMLElement');
  }
  const placeholder = selector !== undefined ? on.querySelector(selector) : on;
  if (!_.isElement(placeholder)) {
    throw new Error(`Not found element in "${on}" using selector "${selector}"`);
  }
  if (!_.isElement(placeholder.parentNode)) {
    throw new Error(`Expected selected element to have parent node`);
  }
  placeholder.parentNode.replaceChild(element, placeholder);
  return element;
}

function renderHtml({ html, on, selector }) {
  const element = elementFrom({ html });
  return renderElement({ element, on, selector });
}

function renderFactory({ factory, on, selector }) {
  const placeholders = selector !== undefined ? [...on.querySelectorAll(selector)] : [on];
  if (placeholders.length === 0) {
    throw new Error(`Not found element in "${on}" using selector "${selector}"`);
  }
  // @ts-ignore
  return placeholders.map((x) => renderElement({ element: factory(), on: x }));
}

/**
 * @type {{
 * (params: { html: string, on: Element, selector?: string }): HTMLElement;
 * (params: { element: HTMLElement, on: Element, selector?: string }): HTMLElement;
 * (params: { factory: () => HTMLElement, on: Element, selector?: string }): HTMLElement[];
 * }}
 */
// @ts-ignore
const render = ({ html, element, factory, on, selector }) => {
  if (!_.isElement(on)) {
    throw new Error('Invalid argument "on", expected HTMLElement');
  }
  if (selector !== undefined && !_.isString(selector)) {
    throw new Error('Invalid argument "selector", expected string');
  }
  const overloads = [
    [html, () => renderHtml({ html, on, selector })],
    [element, () => renderElement({ element, on, selector })],
    [factory, () => renderFactory({ factory, on, selector })],
  ];
  let renderFn;
  let overloadsCount = 0;
  for (const [key, fn] of overloads) {
    if (key !== undefined) {
      overloadsCount += 1;
      renderFn = fn;
    }
  }
  if (overloadsCount !== 1) {
    throw new Error('Invalid overload, expected one of ["html","element","factory"]');
  }
  return renderFn();
};

const UNSAFE_TAG = Symbol('UNSAFE_TAG');

function unsafe(value) {
  return Object.freeze({ code: `${value}`, [UNSAFE_TAG]: true });
}

/**
 * @template T
 * @typedef {{cond: (value: any) => value is T, parse: (value: T, ctx: HtmlLiteralParserContext) => string }} HtmlLiteralParser
 */

/** @type {HtmlLiteralParser<Array<any>>} */
const arrayParser = {
  cond: _.isArray,
  parse: (value, ctx) => value.reduce((p, c) => [...p, ctx.parse(c)], []).join(' '),
};

/** @type {HtmlLiteralParser<ReturnType<unsafe>>} */
const unsafeParser = {
  // @ts-ignore
  cond: (value) => value && value[UNSAFE_TAG] === true,
  parse: (value) => value.code,
};

/** @type {HtmlLiteralParser<HTMLElement>} */
const elementParser = {
  // @ts-ignore
  cond: _.isElement,
  parse: (value, ctx) => ctx.emplace(value),
};

/** @type {HtmlLiteralParser<any>} */
const objectParser = {
  // @ts-ignore
  cond: _.isObjectLike,
  parse: (value) => _.escape(`${JSON.stringify(value)}`),
};

/** @type {HtmlLiteralParser<any>[]} */
const htmlParsers = [arrayParser, unsafeParser, elementParser, objectParser];

const HTML_LITERAL_PARSER_CONTEXT_TOKEN = '___HTML_LITERAL_PARSER_CONTEXT_TOKEN___';
class HtmlLiteralParserContext {
  #store = [];

  /** @type {(value: any) => string} */
  parse(value) {
    for (const parser of htmlParsers) {
      if (parser.cond(value)) {
        return parser.parse(value, this);
      }
    }
    return _.escape(`${value}`);
  }

  /** @type {(elem: HTMLElement) => string} */
  emplace(elem) {
    this.#store.push(elem);
    return `<slot id="${HTML_LITERAL_PARSER_CONTEXT_TOKEN}"></slot>`;
  }

  /**
   * @param {HTMLElement} elem
   */
  render(elem) {
    if (this.#store.length === 0) {
      return elem;
    }
    let i = 0;
    // eslint-disable-next-line no-plusplus
    const factory = () => this.#store[i++];
    render({ factory, on: elem, selector: `#${HTML_LITERAL_PARSER_CONTEXT_TOKEN}` });
    return elem;
  }
}

/**
 *
 * @param {TemplateStringsArray} strings
 * @param  {...any} values
 */
function htmlLiteral(strings, ...values) {
  const { raw } = strings;
  const ctx = new HtmlLiteralParserContext();
  const html = `${values.reduce((p, c, i) => `${p}${raw[i]}${ctx.parse(c)}`, '')}${raw[raw.length - 1]}`;
  const elem = elementFrom({ html });
  return ctx.render(elem);
}

export { render, htmlLiteral as html, unsafe };
