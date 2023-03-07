import React from "react";
import './styles/Card.css'

function Card({img,val,suit}) {
    return (
        <div className="Card">
            <img src={img} alt={`${val} of ${suit}`}></img>
        </div>
    )
}

export default Card