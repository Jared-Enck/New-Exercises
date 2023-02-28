import { useState } from 'react'
import './EightBall.css'

const EightBall = ({answers}) => {
    const initialState = {
        msg: "Think of a Question",
        color: "secondary"
    }
    function handleClick() {
        const idx = Math.floor(Math.random() * answers.length)
        setAnswer(answers[idx])
    }
    const [answer, setAnswer] = useState(initialState)

    return <div className="row justify-content-center d-grid gap-2">
                <div onClick={ handleClick } 
                    className="EightBall rounded-circle bg-black d-flex align-items-center">
                    <p className={`EightBall-answer text-center text-white mx-auto p-2 rounded-5 bg-${answer.color}`}>
                        {answer.msg}
                    </p>
                </div>
                <button onClick={() => setAnswer(initialState)}
                    className="btn btn-medium btn-primary mx-auto">
                    Reset
                </button>
            </div>
}

export default EightBall