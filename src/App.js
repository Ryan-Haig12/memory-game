import React, { useState } from 'react'

import Field from './playingField/Field'
import InputBar from './imageSearch/InputBar'

const App = () => {
    const [ gifData, setGifData ] = useState(undefined)

    return (
        <div>
            <div style={{ display: 'block', width: '100%' }} >
                <h1 style={{ float: 'left' }} >Memory Game</h1>
                <img style={{ margin: '1vh' }}  src="/img/PoweredBy_200px-White_HorizLogo.png" />
            </div>

            <InputBar setGifData={ setGifData } />
            <Field gifData={ gifData } />
        </div>
    )
}

export default App
