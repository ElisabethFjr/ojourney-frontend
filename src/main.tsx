import React from 'react';

//  Import ReactDom
import ReactDOM from 'react-dom/client';

// Import Provider Redux
import { Provider } from 'react-redux';

// Import React Router
import { BrowserRouter } from 'react-router-dom';

// Import App
import App from './components/App/App';

// Import global style file
import './styles/index.scss';

// Import store
import store from './store';

// Creat root for the App
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Inject App in DOM
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
