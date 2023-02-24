const App = () => (
    <div>
        <Tweet username="disGuy42" name="Jared" date="24-Feb-2023" message="dis a tweet." />
        <Tweet username="otherPerson1" name="U1" date="24-Feb-2023" message="I'm another user." />
        <Tweet username="otherPerson2" name="U2" date="24-Feb-2023" message="Also another user, hey." />
    </div>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)