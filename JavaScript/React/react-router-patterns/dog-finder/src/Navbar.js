import { NavLink, Link } from 'react-router-dom';
import './styles/Navbar.css'

function Navbar({names}) {
    return (
        <nav className='Navbar'>
            <Link to='/dogs' className='Navbar-brand'>
                Daags
            </Link>
            <div className='Navbar-links'>
                {names.map(name => (
                    <NavLink
                        key={name}
                        to={`/dogs/${name.toLowerCase()}`} 
                    >
                        {name}
                    </NavLink>
                    )
                )}
            </div>
        </nav>
    )
}

export default Navbar