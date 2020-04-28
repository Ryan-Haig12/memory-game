import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'

const Card = ({ gifurl, index, guessHandler, guesses }) => {

    const [ showGif, setShowGif ] = useState(false)

    useEffect(() => {
        if(guesses !== undefined && guesses !== null && guesses.correctGuesses !== undefined && guesses.correctGuesses !== null) {
            if(gifurl !== guesses.firstGuess && gifurl !== guesses.secondGuess && !guesses.correctGuesses?.includes(gifurl)) {
                setShowGif(false)
            }
        }
    }, [ gifurl, setShowGif, guesses ])

    return (
        <Col
            key={ index }
            style={{
                'marginRight': '10px',
                height: '17vh',
                border: '1px solid red'
            }}
            onClick={ () => {
                setShowGif(true)
                guessHandler(gifurl)
            }}
        >
            { showGif &&
                <img 
                    src={ gifurl } 
                    alt="Be patient..." 
                    style={{ width: '100%', height: '100%' }}
                />
            }
            { !showGif && <p>{ index }</p> }
        </Col>
    )
}

export default Card
