import { Link } from 'react-router-dom';

function Chips() {
    return (
        <div className='justify-content-center d-grid gap-3'>
            <h2>
                Take all the chips!
            </h2>
            <img src='https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnJTIwb2YlMjBjaGlwc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60'
            alt='chips'
            />
            <Link to='/'>
                Go Back
            </Link>
        </div>
    )
}

export default Chips