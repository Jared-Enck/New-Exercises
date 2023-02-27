import './App.css';
import Pokedex from './Pokedex';
import pokeArr from './pokeArr';

function App() {
  return (
    <Pokedex pokeArr={pokeArr}/>
  )
}

export default App;
