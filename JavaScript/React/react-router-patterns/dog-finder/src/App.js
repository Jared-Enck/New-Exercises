import './styles/App.css';
import Navbar from './Navbar';
import AllRoutes from './AllRoutes';
import dogs from './dogs';

function App() {
  return (
    <div className="App">
      <Navbar names={ dogs.map(d => d.name) } />
      <AllRoutes dogs={dogs} />
    </div>
  );
}

export default App;
