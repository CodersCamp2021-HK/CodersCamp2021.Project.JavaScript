import './public/style.css';
import { html } from './shared';

const root = document.querySelector('#app');
const element = html`
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
root.appendChild(element);
