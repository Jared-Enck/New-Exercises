import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";

const BASE_API = 'https://deckofcardsapi.com/api/deck'

function Deck() {

    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const [autoDraw, setAutoDraw] = useState(false)
    const timerID = useRef(null)

    useEffect(() => {
        async function getDeck() {
            try {
                const res = await axios.get(`${BASE_API}/new/shuffle/?deck_count=1`)
                setDeck(res.data)
            } catch(e) {
                console.log(e)
            }
        }
        getDeck()
    }, [])

    async function drawCard(deck_id) {
        try {
            const res = await axios.get(
                `${BASE_API}/${deck_id}/draw/?count=1`
            )
            if (res.data.cards[0]) {
                const newCard = res.data.cards[0]
                setCards(cards => [...cards, newCard])
    
                delete res.data.cards
                setDeck(res.data)
            } else {
                stopDraw()
                alert('No cards left!')
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function shuffle(deck_id) {
        try {
            const res = await axios.get(
                `${BASE_API}/${deck_id}/shuffle`
            )
            stopDraw()
            setCards([])
            setDeck(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const cardsComponents = (
        cards.map(card => {
            const {code,image,value,suit} = card

            // using card code for the key prop here, as there is only one deck being used.
            return <Card 
                        key={code} 
                        img={image} 
                        val={value} 
                        suit={suit} 
                    />
        })
    )

    const stopDraw = () => {
        clearInterval(timerID.current)
        timerID.current = null
        setAutoDraw(false)
    }
    
    const drawEverySecond = () => {
        setAutoDraw(true)
        if (!timerID.current) {
            timerID.current = setInterval(async () => {
                await drawCard(deck.deck_id)
            }, 1000)
        }
    }

    const shuffleBtn = (
        <button 
            onClick={() => shuffle(deck.deck_id)} 
            className="btn btn-md btn-dark shadow"
        >
            Shuffle
        </button>
    )

    const drawBtn = (
        <button 
            onClick={!autoDraw && !timerID.current ? drawEverySecond : stopDraw} 
            className="btn btn-md btn-dark shadow"
        >
            {!autoDraw && !timerID.current ? 'Start' : 'Stop' } Drawing
        </button>
    )

    return (
        <>
            <div className="row mx auto draw-btn-wrapper">
                {shuffleBtn}
                {deck.remaining > 0 ? drawBtn : null}
            </div>
            <div className="row mx-auto justify-content-center">
                {cards.length ? cardsComponents : null}
            </div>
        </>
    )
}

export default Deck