import React from 'react'
import Col from 'react-bootstrap/Col'

const Card = ({ gifurl, index }) => {
    return (
            <Col
                key={ index }
                style={{
                    'marginRight': '10px',
                    height: '17vh',
                    border: '1px solid red'
                }}
            >
                <img 
                    src={ gifurl } 
                    alt="Be patient..." 
                    style={{ width: '100%', height: '100%' }}
                />
            </Col>
    )
}

export default Card
