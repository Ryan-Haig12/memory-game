import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import _ from 'lodash'

import Card from './Card' 

const Field = ({ gifData }) => {
    const [ randGifs, setRandGifs ] = useState(undefined)
    const [ guesses, setGuesses ] = useState({
        firstGuess: '',
        secondGuess: '',
        match: false
    })

    useEffect(() => {
        // get 8 random gifs from gifdata
        let gifs = _.shuffle(gifData).splice(0, 8)
        let clone = _.map(gifs, _.cloneDeep).concat(gifs)
        setRandGifs(_.shuffle(clone))
    }, [ gifData ])

    useEffect(() => {
        console.log(guesses)
        if(guesses.secondGuess?.length) {
            if(guesses.firstGuess === guesses.secondGuess) {
                console.log('guesses match!')
                setGuesses({ match: true })
                setTimeout(() => {
                    setGuesses({ firstGuess: '', secondGuess: '', match: false })
                }, 3000)
            }
        }

        if(guesses.secondGuess?.length && !guesses.match) {
            console.log('guesses do not match')
            setTimeout(() => {
                setGuesses({ firstGuess: '', secondGuess: '', match: false })
            }, 3000)
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
            Testo
            { getRows() }
        </Container>
    )
}

export default Field
