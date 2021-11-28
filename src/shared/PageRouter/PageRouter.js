import { render } from '../Dom';

/**
 * @template T
 * @typedef {{ [k in keyof T]: T[k] extends (props: infer P) => HTMLElement ? keyof Omit<P,'router'> extends never ? { page: k } : { page: k, data: Omit<P,'router'> } : never; }[keyof T]} RouterGoToProps
 */

/**
 * @typedef {(props: unknown & { router?: PageRouter<any> }) => HTMLElement} AnyPageFactory
 */

/**
 * @template {{[x: string]: AnyPageFactory}} T
 * @typedef {{router: PageRouter<T>}} RouterPropsOf
 */

/**
 * @template {{[x: string]: AnyPageFactory}} T
 * @param {T} mapping
 */
class PageRouter {
  #pages;

  #root;

  /**
   * @param {T} pages
   * @param {Element} root
   */
  constructor(pages, root) {
    this.#pages = pages;
    this.#root = root;
  }

  /**
   * @param {RouterGoToProps<T>} props
   */
  goto(props) {
    if (!(props.page in this.#pages)) {
      throw new Error(
        `Invalid props.page argument ${props.page}, expected: one of [${Object.keys(this.#pages).join(',')}]`,
      );
    }
    // @ts-ignore
    const newPage = this.#pages[props.page]({ ...(props?.data ?? {}), router: this });
    this.#root.innerHTML = '<div></div>';
    render({ element: newPage, on: this.#root.firstElementChild });
  }
}

export { PageRouter };
