import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CookiesProvider } from 'react-cookie';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'
import { PostProvider } from './providers/postContext';

ReactDOM.render(
  <React.StrictMode>
    <PostProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </PostProvider>
  </React.StrictMode>,
  document.getElementById('root')
);