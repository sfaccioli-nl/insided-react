import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import Commits from './Components/Commits/Commits';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="commits" element={<Commits />} />
    </Routes>
  </BrowserRouter>
);


reportWebVitals();
