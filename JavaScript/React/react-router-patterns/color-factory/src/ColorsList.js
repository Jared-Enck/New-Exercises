import './styles/ColorsList.css'
import { Link } from 'react-router-dom'

function ColorsList({colors}) {
    return (
        <>
            <p>Please select a color.</p>
            <ul className="ColorsList">
                {
                    colors.map(color => 
                        <li 
                            key={color}
                        >
                            <Link
                                to={`/colors/${color}`}
                            >
                                {color}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default ColorsList