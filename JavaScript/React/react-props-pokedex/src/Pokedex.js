import Pokecard from "./Pokecard"

const Pokedex = ({pokeArr}) => (
    <div className="row justify-content-center">
        <h2 className="text-center text-secondary">
            Pokedex
        </h2>
        {pokeArr.map(p => 
            <Pokecard 
                key={p.id}
                id={p.id}
                name={p.name}
                type={p.type}
                EXP={p.base_experience} 
            />
        )}
    </div>
)

export default Pokedex