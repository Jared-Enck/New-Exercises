import axios from "axios";
import {useState} from "react";
import { v4 as uuid } from "uuid";


function useFlip(initialVal = true) {
    const [value, setValue] = useState(initialVal)

    const toggleFlip = () => {
        setValue(flip => !flip)
    }

    return [value, toggleFlip]
}

function useAxios(baseUrl) {
    const [responses, setResponses] = useState([])
    
    const addResData = async (term='') => {
        const url = (
            term.length
            ? `${baseUrl}${term}`
            : `${baseUrl}`
        )
        const response = await axios.get(url)
        setResponses(data => {
            const resData = response.data.cards 
                ? response.data.cards[0]
                : response.data
            
            return [...data, {...resData, id: uuid()}]
        })
    }

    return [responses, addResData]
}

export {useFlip, useAxios}