import { NavLink, Link } from 'react-router-dom';
import './styles/Navbar.css'

function Navbar({names}) {
    return (
        <nav className='Navbar'>
            <Link to='/dogs' className='Navbar-brand text-light'>
                Daags
            </Link>
            <div className='Navbar-links'>
                {names.map(name => {
                    <NavLink 
                        key={name}
                        to={`/dogs/${name.toLowerCase()}`} 
                    >
                        <span className='Navbar-link'>
                            {name}
                        </span>
                    </NavLink>
                    }
                )}
            </div>
        </nav>
    )
}

export default Navbar