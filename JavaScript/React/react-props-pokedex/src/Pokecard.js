const Pokecard = ({id, name, type, EXP}) => (
    <div className="card bg-light m-3">
        <div className="card-body">
            <h4 className="card-title text-center text-primary">
                {name}
            </h4>
            <img className="mx-auto d-block" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name}></img>
            <p className="text-center">
                Type: {type} <br></br>
                EXP: {EXP}
            </p>
        </div>
    </div>
)

export default Pokecard