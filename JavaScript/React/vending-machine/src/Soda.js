import { Link } from 'react-router-dom';

function Soda() {
    return (
        <div className='justify-content-center d-grid gap-3'>
            <h2>
                Here's a soda!
            </h2>
            <img src='https://images.unsplash.com/photo-1585498154575-3db0fda49f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c29kYSUyMGNhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60' 
            alt='soda can'
            />
            <Link to='/'>
                Go Back
            </Link>
        </div>
    )
}

export default Soda