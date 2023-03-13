function DogList({dogs}) {
    return (
        <div className="Doglist">
            {dogs.map(d => <DogCard name={d.name} image={d.src} />)}
        </div>
    )
}

export default DogList