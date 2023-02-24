const App = () => (
    <div>
        <Tweet 
        username="disGuy42" 
        name="Jared" 
        date={new Date().toDateString()}
        message="dis a tweet." 
        />
        <Tweet 
        username="otherPerson1" 
        name="U1" 
        date={new Date().toDateString()}
        message="I'm another user." 
        />
        <Tweet 
        username="otherPerson2" 
        name="U2" 
        date={new Date().toDateString()} 
        message="Also another user, hey." 
        />
    </div>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)