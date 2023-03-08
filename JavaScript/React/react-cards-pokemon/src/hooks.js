import {useState} from "react";

function useFlip(initialVal = true) {
    const [value, setValue] = useState(initialVal)

    const toggleFlip = () => {
        setValue(flip => !flip)
    }

    return [value, toggleFlip]
}

export default useFlip