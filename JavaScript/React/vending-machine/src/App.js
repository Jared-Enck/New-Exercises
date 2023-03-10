import { Route } from 'react-router-dom';
import './styles/App.css';

import VendingMachine from './VendingMachine';
import Soda from './Soda';
import Chips from './Chips';
import Candybar from './Candybar';
import Navbar from './Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Route exact path={'/'}>
        <VendingMachine />
      </Route>
      <Route exact path={'/soda'}>
        <Soda />
      </Route>
      <Route exact path={'/chips'}>
        <Chips />
      </Route>
      <Route exact path={'/candybar'}>
        <Candybar />
      </Route>
    </div>
  );
}

export default App;
