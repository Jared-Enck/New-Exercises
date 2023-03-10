import { Link } from 'react-router-dom';
import './styles/VendingMachine.css'

function VendingMachine() {

    return (
        <div className='VendingMachine container-fluid'>
            <div className='row mx-auto justify-content-between p-3'>
                <div className='VendingMachine-section col-4 col-sm-3 col-xl-2 rounded-3'>
                    <p className='m-0'>
                        Hello, I am a vending machine. What would you like to eat?
                    </p>
                </div>
                <div className='VendingMachine-section col-4 col-sm-3 col-xl-2 gap-4 rounded-3'>
                    <span>
                        <Link to='/soda'>
                            Soda
                        </Link>
                    </span>
                    <span>
                        <Link to='/chips'>
                            Chips
                        </Link>
                    </span>
                    <span>
                        <Link to='/candybar'>
                            Candybar
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VendingMachine