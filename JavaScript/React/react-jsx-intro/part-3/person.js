const Person = ({name, age, hobbies}) => {
    let abrName;
    if (name.length > 8) abrName = name.slice(0,7)

    return (
        <div>
            <p>
                Learn some information about {abrName || name}
            </p>
            <ul>
                {hobbies.map(h => <li>{h}</li>)}
            </ul>
            <h3>
                {(age > 18) ? "please got vote!": "you must be 18"}             
            </h3>
        </div>
    )
}