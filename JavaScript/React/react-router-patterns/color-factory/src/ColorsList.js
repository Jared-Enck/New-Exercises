import './styles/ColorsList.css'
import { Link } from 'react-router-dom'

function ColorsList({colors}) {
    return (
        <ul className="ColorsList">
            {
                colors.map(color => 
                    <li 
                        key={color}
                    >
                        <Link
                            to={`colors/${color}`}
                        >
                            {color}
                        </Link>
                    </li>
                )
            }
        </ul>
    )
}

export default ColorsList