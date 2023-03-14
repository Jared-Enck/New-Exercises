import ColorsList from "./ColorsList"
import { Link } from 'react-router-dom'
import './styles/ColorsContainer.css'

function ColorsContainer({colors}) {
    return (
        <div className="ColorsContainer">
            <div className="ColorsContainer-banner">
                <h3>
                    Welcome to the color factory.
                </h3>
                <Link 
                    to={'/colors/new'}
                    className="ColorsContainer-add"
                    >
                    Add a color
                </Link>
            </div>
            {colors.length ? <ColorsList colors={colors} /> : null}
        </div>
    )
}

export default ColorsContainer