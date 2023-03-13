import './styles/DogCard.css'

function DogCard({name,image}) {
    return (
        <div className="DogCard">
            <h2>
                {name}
            </h2>
            <img src={image} alt={name} />
        </div>
    )
}

export default DogCard