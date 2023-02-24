const App = () => (
    <div>
        <Person 
        name="Alexandra" 
        age={46} 
        hobbies={['fishing','rebuilding cars']} 
        />
        <Person 
        name="Tony" 
        age={17} 
        hobbies={['video games','parkour','chess']} 
        />
        <Person 
        name="Chad" 
        age={28} 
        hobbies={['painting','reading']} 
        />
    </div>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)