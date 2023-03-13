import { useParams } from "react-router-dom"
import './styles/DogDetails.css'

function DogDetails({dogs}) {
    const { name } = useParams()
    const dog = dogs.filter(d => d.name.toLowerCase() === name)[0]
    console.log(dog.facts)
    return (
        <div className="DogDetails">
            <h1>{dog.name}</h1>
            <span>Age: {dog.age}</span>
            <div>
                <h3>
                    Facts
                </h3>
                <ul className="DogDetails-facts">
                    {dog.facts.map((f,idx) => <li key={idx}>{f}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default DogDetails