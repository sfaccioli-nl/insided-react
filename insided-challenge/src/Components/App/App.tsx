import { Outlet } from 'react-router-dom';
import Keys from '../Keys/Keys';
import './App.scss';

/**
 * App component
 */
function App() {
  return (
    <div className="App">
      {<Keys />}
      <Outlet />
    </div>
  );
}

export default App;
