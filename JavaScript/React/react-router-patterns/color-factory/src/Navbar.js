import { NavLink, Link } from 'react-router-dom';
import './styles/Navbar.css'

function Navbar() {
    return (
        <nav className='Navbar'>
            <Link to='/colors' className='Navbar-brand'>
                Colors
            </Link>
            <div className='Navbar-links'>

            </div>
        </nav>
    )
}

export default Navbar