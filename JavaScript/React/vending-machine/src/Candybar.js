import { Link } from 'react-router-dom';

function Candybar() {
    return (
        <div className='justify-content-center d-grid gap-3'>
            <h2>
                Which one though? 🤔
            </h2>
            <img src='https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25pY2tlcnMlMjBjYW5keXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
            alt='candybars'
            />
            <Link to='/'>
                Go Back
            </Link>
        </div>
    )
}

export default Candybar