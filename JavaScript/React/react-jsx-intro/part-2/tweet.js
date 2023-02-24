const Tweet = ({username,name,date,message}) => (
    <div>
        <h3>{username} - {name}</h3>
        <p>{message}</p>
        <span>on {date}</span>
    </div>
)