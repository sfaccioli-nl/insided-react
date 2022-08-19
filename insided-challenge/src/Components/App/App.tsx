import React from 'react';
import { useCredentials } from '../../Hooks/useCredentials';
import Commits from '../Commits/Commits';
import Keys from '../Keys/Keys';
import './App.scss';

function App() {
  const { token } = useCredentials();

  return (
    <div className="App">
      {token ? <Commits /> : <Keys />}
    </div>
  );
}

export default App;
