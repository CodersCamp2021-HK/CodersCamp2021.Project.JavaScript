import { Button } from '../../components';
import { html, render } from '../../shared';
import styles from './Todo.module.css';

/**
 * @param {{id: number} & import('..').RouterProps} props
 * @returns
 */
function Todo({ router, id }) {
  const key = `todos${id}`;

  /** @type {string[]} */
  const todos = JSON.parse(localStorage.getItem(key)) || [];

  const ref = { removeTodo: undefined };

  const createTodosUl = (list) => html`<ul class="${styles.list}" aria-label="todo-list">
    ${list.map(
      (text, idx) => html`<li aria-label="todo-${idx}">
        ${Button({
          onClick: (e) => {
            e.stopPropagation();
            ref.removeTodo(idx);
          },
          text: 'X',
        })}
        ${text}
      </li>`,
    )}
  </ul>`;

  /** @type {HTMLInputElement} */
  // @ts-ignore
  const textbox = html`<input class="${styles.textbox}" type="text" />`;

  const updateTodosUl = (list) => {
    render({ element: createTodosUl(list), on: document.body, selector: 'ul[aria-label="todo-list"]' });
  };

  const removeTodo = (idx) => {
    todos.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(todos));
    updateTodosUl(todos);
  };

  ref.removeTodo = removeTodo;

  const addTodo = () => {
    if (textbox.value) {
      todos.push(textbox.value);
      localStorage.setItem(key, JSON.stringify(todos));
      updateTodosUl(todos);
    }
  };

  const homeBtn = Button({
    onClick: (e) => {
      e.stopPropagation();
      router.goto({ page: 'home' });
    },
    text: 'Home',
  });

  const addTodoBtn = Button({
    onClick: (e) => {
      e.preventDefault();
      addTodo();
    },
    text: 'Add Todo',
  });

  return html`<div class="vstack">
    <h2>Todo ${id}</h2>
    ${homeBtn}
    <div>${textbox} ${addTodoBtn}</div>
    ${createTodosUl(todos)}
  </div>`;
}

export { Todo };
