import React, { useState } from 'react'

const useInput = (checker) => {
    const [error, setError] = useState(false)
    
    const changeHandler = () => {
        setError(false)
    }
    const blurHandler = () => {
        const comp = checker()
        if (comp) {
            setError(true)
        }
    }
    return {
        changeHandler,
        blurHandler,
        error
    }
}
export default useInput