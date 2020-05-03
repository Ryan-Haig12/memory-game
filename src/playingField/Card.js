import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Flip from 'react-reveal/Flip'

import './Card.css'

const Card = ({ gifurl, index, guessHandler, guesses }) => {

    const [ showGif, setShowGif ] = useState(false)

    useEffect(() => {
        if(guesses !== undefined && guesses !== null && guesses.correctGuesses !== undefined && guesses.correctGuesses !== null) {
            if(gifurl !== guesses.firstGuess && gifurl !== guesses.secondGuess && gifurl !== guesses.thirdGuess && !guesses.correctGuesses?.includes(gifurl)) {
                setShowGif(false)
            }
        }
    }, [ gifurl, setShowGif, guesses ])

    return (
        <Col
            className="face" 
            key={ index }
            style={{
                'marginRight': '10px',
                height: '17vh',
            }}
            onClick={ () => {
                setShowGif(true)
                guessHandler(gifurl)
            }}
        >
            { showGif &&
                <Flip right>
                    <img 
                        src={ gifurl } 
                        alt="Be patient..." 
                        style={{ width: '100%', height: '100%' }}
                    />
                </Flip>
            }
            { !showGif && 
                <Flip right>
                    <img src={ '/img/back.jpg' } style={{ height: 'auto', maxWidth: '100%', maxHeight: '100%' }} ></img>
                </Flip>
            }
        </Col>
    )
}

export default Card
