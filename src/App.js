import React, { useState } from 'react'

import Field from './playingField/Field'
import InputBar from './imageSearch/InputBar'

const App = () => {
    const [ gifData, setGifData ] = useState(undefined)

    return (
        <div>
            <h1>Memory Game</h1>
            <InputBar setGifData={ setGifData } />
            <Field gifData={ gifData } />
        </div>
    )
}

export default App
