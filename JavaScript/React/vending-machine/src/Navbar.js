import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='Navbar navbar navbar-dark bg-dark p-3'>
            <NavLink exact to='/' className='navbar-brand text-light'>
                Vending Machine
            </NavLink>
            <NavLink exact to='/soda' className='nav-link text-light'>
                Soda
            </NavLink>
            <NavLink exact to='/chips' className='nav-link text-light'>
                Chips
            </NavLink>
            <NavLink exact to='/candybar' className='nav-link text-light'>
                Candybar
            </NavLink>
        </nav>
    )
}

export default Navbar