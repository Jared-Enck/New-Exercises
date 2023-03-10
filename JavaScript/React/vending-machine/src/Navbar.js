import { NavLink, Link } from 'react-router-dom';
import './styles/Navbar.css'

function Navbar() {
    return (
        <nav className='Navbar navbar navbar-dark bg-dark p-0'>
            <Link exact to='/' className='navbar-brand text-light'>
                Vending Machine
            </Link>
            <div className='Navbar-links navbar navbar-right'>
                <NavLink exact to='/soda' className='nav-link'>
                    Soda
                </NavLink>
                <NavLink exact to='/chips' className='nav-link'>
                    Chips
                </NavLink>
                <NavLink exact to='/candybar' className='nav-link'>
                    Candybar
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar