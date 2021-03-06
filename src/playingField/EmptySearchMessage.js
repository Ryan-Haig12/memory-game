import React from 'react'
import styled from 'styled-components'

const StyledEmptyMessage = styled.div`
    margin: 0 auto;
    padding-top: 10%;
    position: relative;
    width: 50%;
    height: 100px;
    color: #ededed;

    @media (max-width: 400px) {
        width: 100%;
    }
`

const StyledMessageDiv = styled.div`
    border-radius:20px;
    -moz-border-radius:20px;
    -webkit-border-radius:20px;
    border: 1px solid;
    padding: 5px;
    background: black;
`

const EmptySearchMessage = () => {
    return (
        <StyledEmptyMessage>
            <StyledMessageDiv>
                <h2>Welcome to Memory Game!</h2>
                <br />
                <p>To play, enter a word or phrase into the search bar above. This will cause 16 squares to appear, all hiding a different gif from Giphy.</p>
                <p>Click one of these squares to reveal the gif behind. Try to match this gif with the corresponding gif behind the other squares.</p>
                <p>Try to solve the puzzle in as little time and using as few clicks as possible!</p>
            </StyledMessageDiv>
        </StyledEmptyMessage>
    )
}

export default EmptySearchMessage
