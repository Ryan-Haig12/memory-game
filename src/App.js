import React, { useState } from 'react'
import styled from 'styled-components'

import Field from './playingField/Field'
import InputBar from './imageSearch/InputBar'

const App = () => {
    const [ gifData, setGifData ] = useState(undefined)
    const [ searching, setSearching ] = useState(false)

    return (
        <div style={{ margin: '20px', background: '#595959' }} >
            <div style={{ display: 'block', width: '100%' }} >
                <h1 style={{ float: 'left', color: '#ededed' }} >Memory Game</h1>
                <img style={{ margin: '1vh' }}  src="/img/PoweredBy_200px-White_HorizLogo.png" />
            </div>

            <InputBar setGifData={ setGifData } setSearching={ setSearching } />
            <Field gifData={ gifData } searching={ searching } />
        </div>
    )
}

export default App
