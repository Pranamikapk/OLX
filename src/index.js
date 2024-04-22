import React from 'react';
import ReactDOM from 'react-dom/client';
import Context, { FirebaseContext } from '../src/store/Context';
import App from './App';
import { Firebase } from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={ Firebase }>
      <Context>
        <FirebaseContext.Provider value={ Firebase }>
        <App />
        </FirebaseContext.Provider>
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);


