import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
//import { Provider } from 'react-redux';
//import playlistReducer from './stores/playlist';
//import { configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
);