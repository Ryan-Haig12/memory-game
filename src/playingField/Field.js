import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import _ from 'lodash'

import Card from './Card'
import EmptySearchMessage from './EmptySearchMessage'

const Field = ({ gifData }) => {
    const [ randGifs, setRandGifs ] = useState(undefined)
    const [ gamestats, setGameStats ] = useState({
        clicks: 0,
        seconds: 0,
    })
    const [ guesses, setGuesses ] = useState({
        firstGuess: '',
        secondGuess: '',
        thirdGuess: '',
        correctGuesses: []
    })

    // get 8 random gifs from gifdata
    useEffect(() => {
        let gifs = _.shuffle(gifData).splice(0, 8)
        let clone = _.map(gifs, _.cloneDeep).concat(gifs)
        setRandGifs(_.shuffle(clone))

        setGameStats({ clicks: 0, seconds: 0 })
        setGuesses({ firstGuess: '', secondGuess: '', thirdGuess: '', correctGuesses: [] })
    }, [ gifData ])

    // guesses logic
    useEffect(() => {
        // if the user has made 2 guesses
        if(guesses.secondGuess?.length) {
            const match = guesses.firstGuess === guesses.secondGuess
            const match_2 = guesses.thirdGuess === guesses.secondGuess || guesses.firstGuess === guesses.thirdGuess

            // the two guesses match
            if(match && !guesses.correctGuesses.includes(guesses.firstGuess)) {
                let data = guesses.correctGuesses
                data.push(guesses.firstGuess)
                setGuesses({ ...guesses, correctGuesses: data, firstGuess: '', secondGuess: '', thirdGuess: '' })
            }

            if(match_2 && !guesses.correctGuesses.includes(guesses.thirdGuess)) {
                let data = guesses.correctGuesses
                data.push(guesses.thirdGuess)
                setGuesses({ ...guesses, correctGuesses: data, firstGuess: '', secondGuess: '', thirdGuess: '' })
            }

            if(!match && guesses.thirdGuess.length) {
                setGuesses({ ...guesses, firstGuess: guesses.thirdGuess, secondGuess: '', thirdGuess: '' })
            }
        }
    }, [ guesses ])

    const guessHandler = guess => {
        setGameStats({ ...gamestats, clicks: gamestats.clicks + 1 })

        if(guesses.firstGuess === '') {
            setGuesses({ ...guesses, firstGuess: guess })
        } 
        
        if(guesses.firstGuess.length) {
            setGuesses({ ...guesses, secondGuess: guess })
        }

        if(guesses.secondGuess.length) {
            setGuesses({ ...guesses, thirdGuess: guess })
        }
    }

    const getCols = (i) => {
        let res = []

        if(!randGifs.length) return

        for(let j = 0; j < 4; j++) {
            const index = (i * 4) + j
            res.push(
                <Card 
                    key={ index }
                    gifurl={ randGifs[index].images.original.webp }
                    guessHandler={ guessHandler }
                    index={ index }
                    guesses={ guesses }
                    correctGuesses={ guesses.correctGuesses }
                />
            )
        }

        return res
    }

    const getRows = () => {
        let res = []

        for(let i = 0; i < 4; i++) {
            res.push((
                <Row 
                    key={ i }
                    style={{ margin: '5px', padding: '15px' }} >
                    { getCols(i) }
                </Row>
            ))
        }

        return res
    }

    if(gifData === undefined || randGifs === undefined) return <EmptySearchMessage />

    return (
        <Container fluid="sm" >
            <div>{ `Clicks: ${ gamestats.clicks }` }</div>
            <div>{ `Seconds: ${ gamestats.seconds }` }</div>
            { guesses.correctGuesses.length === 8 && <div>You Win!!!</div> }
            { getRows() }
        </Container>
    )
}

export default Field
