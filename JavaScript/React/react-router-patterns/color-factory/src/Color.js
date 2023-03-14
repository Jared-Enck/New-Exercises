import { useParams } from "react-router-dom";
import './styles/Color.css'

function Color() {
    const {color} = useParams()
    return (
        <>
            <h2>
                This is {color}
            </h2>
            <div className="Color" style={{backgroundColor: color}} ></div>
        </>
    )
}

export default Color