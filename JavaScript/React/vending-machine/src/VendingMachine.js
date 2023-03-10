import { Link } from 'react-router-dom';
import './styles/VendingMachine.css'

function VendingMachine() {

    return (
        <div className='VendingMachine container-fluid'>
            <p>
                Hello, I am a vending machine. What would you like to eat?
            </p>
            <div>
                <Link to='/soda'>
                    Soda
                </Link>
                <Link to='/chips'>
                    Chips
                </Link>
                <Link to='/candybar'>
                    Candybar
                </Link>
            </div>
        </div>
    )
}

export default VendingMachine