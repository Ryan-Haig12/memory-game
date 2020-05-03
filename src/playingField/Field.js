import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import _ from 'lodash'

import Card from './Card'
import EmptySearchMessage from './EmptySearchMessage'
import ErrorSearchMessage from './ErrorSearchMessage'

const Field = ({ gifData, searching }) => {
    const [ randGifs, setRandGifs ] = useState(undefined)
    let [ gameClock, setGameClock ] = useState(0)
    const [ gamestats, setGameStats ] = useState({
        clicks: 0,
        seconds: 0,
        startTime: 0
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

        setGameStats({ clicks: 0, seconds: 0, startTime: Date.now() })
        setGuesses({ firstGuess: '', secondGuess: '', thirdGuess: '', correctGuesses: [] })
    }, [ gifData ])

    // this doesn't even update anything in the dom, this is only for re-rendering the component every second
    setInterval(() => {
        setGameClock(gameClock += 1)
    }, 1000)

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

            // I'm not a fan of this at all. This is saying that on a users 3rd guess, if it matches either of the first 2 guesses,
            // then the user gets that guess correct. That's not true to this game...
            // However, I can't change it for now. Removing this block unleashes worse bugs that would take a lot longer to deal with.
            // That's why I'm leaving this for now, working on other parts of the app, and then resolving this
            if(match_2 && !guesses.correctGuesses.includes(guesses.thirdGuess)) {
                let data = guesses.correctGuesses
                data.push(guesses.thirdGuess)
                setGuesses({ ...guesses, correctGuesses: data, firstGuess: '', secondGuess: '', thirdGuess: '' })
            }

            if(!match && guesses.thirdGuess.length) {
                setGuesses({ ...guesses, firstGuess: guesses.thirdGuess, secondGuess: '', thirdGuess: '' })
            }

            // if user has won, stop the timer and set the seconds played
            if(guesses.correctGuesses.length >= 8) {
                const time = Date.now()
                let sec = (time - gamestats.startTime)
                sec = Math.ceil(sec / 1000)
                setGameStats({ ...gamestats, startTime: '', seconds: sec })
            }
        }
    }, [ guesses, gamestats, setGameStats ])

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

    // error/loading handling
    if(searching) return <Spinner style={{ position: 'relative', left: '50%', marginTop: '10%' }} animation="border" role="status" />
    if(gifData === undefined || randGifs === undefined) return <EmptySearchMessage />
    if(randGifs !== undefined && randGifs.length < 8) return <ErrorSearchMessage />

    return (
        <Container fluid="sm" >
            <div style={{ color: '#ededed' }} >{ `Clicks: ${ gamestats.clicks }` }</div>
            <div style={{ color: '#ededed' }}>{ `Seconds: ${ Math.ceil((Date.now() - gamestats.startTime) / 1000) }` }</div>
            {
                guesses.correctGuesses.length === 8 &&
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>You Win!</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>{ `You won in ${ gamestats.seconds } seconds` }</p>
                            <p>Make another search in the input bar above to play again</p>
                        </Modal.Body>
                    </Modal.Dialog>
            }

            { getRows() }
        </Container>
    )
}

export default Field
