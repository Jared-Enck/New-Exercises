import Pokecard from "./Pokecard"

const Pokedex = ({pokeArr}) => (
    <div className="row justify-content-center">
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