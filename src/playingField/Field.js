import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import _ from 'lodash'

import Card from './Card'

const Field = ({ gifData }) => {
    const [ randGifs, setRandGifs ] = useState(undefined)
    const [ gamestats, setGameStats ] = useState({
        clicks: 0,
        matches: 0,
        seconds: 0,
    })
    const [ guesses, setGuesses ] = useState({
        firstGuess: '',
        secondGuess: '',
        match: false,
        correctGuesses: []
    })
    const [ called, setCalled ] = useState(false)

    // get 8 random gifs from gifdata
    useEffect(() => {
        let gifs = _.shuffle(gifData).splice(0, 8)
        let clone = _.map(gifs, _.cloneDeep).concat(gifs)
        setRandGifs(_.shuffle(clone))
    }, [ gifData ])

    // guesses logic
    useEffect(() => {
        // if the user has made 2 guesses
        if(guesses.secondGuess?.length) {
            // the two guesses match
            if(guesses.firstGuess === guesses.secondGuess && !guesses.correctGuesses.includes(guesses.firstGuess)) {
                let data = guesses.correctGuesses
                data.push(guesses.firstGuess)
                setGuesses({ ...guesses, correctGuesses: data, match: true, firstGuess: '', secondGuess: '' })
                setCalled(true)
                console.log('guesses match')
                setTimeout(() => {
                    setGuesses({ ...guesses, match: false })
                    console.log('guesses don\'t match anymore')
                }, 3000)
            }
            if(!guesses.match && !called) {
                console.log('guesses do not match')
                setTimeout(() => {
                    setGuesses({ ...guesses, firstGuess: '', secondGuess: '', match: false })
                    setCalled(false)
                    console.log('guesses cleared')
                }, 3000)
            }
        }
    }, [ guesses ])

    const guessHandler = guess => {
        if(guesses.firstGuess === '') {
            setGuesses({ ...guesses, firstGuess: guess })
            return
        } else if(guesses.firstGuess.length) {
            setGuesses({ ...guesses, secondGuess: guess })
            return
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

    if(gifData === undefined || randGifs === undefined) return ( <div>No Gif Data</div> )

    return (
        <Container fluid="sm" >
            Gamestats
            { getRows() }
        </Container>
    )
}

export default Field
