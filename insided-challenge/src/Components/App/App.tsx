import React from 'react';
import { Outlet } from 'react-router-dom';
import { useCredentials } from '../../Hooks/useCredentials';
import Commits from '../Commits/Commits';
import Keys from '../Keys/Keys';
import './App.scss';

function App() {
  const { token } = useCredentials();

  return (
    <div className="App">
      {<Keys />}
      <Outlet />
    </div>
  );
}

export default App;
