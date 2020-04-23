import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Card from './Card'

const Field = ({ gifData }) => {

    useEffect(() => {
        console.log(gifData)
    }, [ gifData ])

    const getCols = (i) => {
        let res = []

        for(let j = 0; j < 4; j++) {
            const index = (i * 4) + j + 1
            res.push(
                <Card 
                    gifurl={ gifData[index].images.original.webp }
                    index={ index } 
                    onClick={ () => console.log(gifData[index]) }
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

    if(gifData === undefined) return ( <div>No Gif Data</div> )

    return (
        <Container fluid="sm" >
            { getRows() }
        </Container>
    )
}

export default Field
