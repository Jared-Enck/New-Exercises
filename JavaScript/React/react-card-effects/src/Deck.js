import axios from "axios";
import React, {useState, useEffect} from "react";
import Card from "./Card";

function Deck() {
    const BASE_API = 'https://deckofcardsapi.com/api/deck'

    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])

    useEffect(() => {
        async function updateDeck() {
            try {
                const res = await axios.get(`${BASE_API}/new/shuffle/?deck_count=1`)
                setDeck(res.data)
            } catch(e) {
                console.log(e)
            }
        }
        updateDeck()
    }, [])

    async function drawCard(deck_id) {
        try {
            const res = await axios.get(
                `${BASE_API}/${deck_id}/draw/?count=1`
            )
            const newCard = res.data.cards[0]
            setCards([...cards, newCard])

            delete res.data.cards
            setDeck(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const cardsComponents = (
        cards.map(card => {
            // using code for the key prop here, as there is only one deck being used.

            const {code,image,value,suit} = card
            return <Card 
                        key={code} 
                        img={image} 
                        val={value} 
                        suit={suit} 
                    />
        })
    )

    const drawBtn = (
        <button 
            onClick={() => drawCard(deck.deck_id)} 
            className="col-2 btn btn-md btn-dark shadow"
        >
            Draw Card
        </button>
    )

    return (
        <>
            <div className="row mx auto draw-btn-wrapper">
                {deck.remaining > 0 ? drawBtn : null}
            </div>
            <div className="row mx-auto d-flex flex-wrap">
                {cards.length ? cardsComponents : null}
            </div>
        </>
    )
}

export default Deck