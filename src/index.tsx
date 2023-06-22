import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root') ?? new DocumentFragment());

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
