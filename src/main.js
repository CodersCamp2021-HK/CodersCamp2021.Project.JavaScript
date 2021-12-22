import './public/style.css';
import { pages } from './pages';
import { PageRouter } from './shared';

const root = document.querySelector('#app');
const pageRouter = new PageRouter(pages, root);
pageRouter.goto({ page: 'home' });
