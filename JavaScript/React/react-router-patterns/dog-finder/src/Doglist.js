import DogCard from "./DogCard"
import './styles/Doglist.css'

function DogList({dogs}) {
    return (
        <div className="Doglist">
            {
                dogs.map(d => 
                    <DogCard
                        key={d.id}
                        name={d.name} 
                        image={d.src} 
                    />
                )
            }
        </div>
    )
}

export default DogList