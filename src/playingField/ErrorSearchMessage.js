import React from 'react'
import styled from 'styled-components'

const StyledEmptyMessage = styled.div`
    margin: 0 auto;
    padding-top: 10%;
    position: relative;
    width: 50%;
    height: 100px;

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

const ErrorSearchMessage = () => {
    return (
        <StyledEmptyMessage style={{ color: '#ededed' }} >
            <StyledMessageDiv>
                <h2>Error fetching gifs</h2>
                <br />
                <p>Please perform another search</p>
            </StyledMessageDiv>
            
        </StyledEmptyMessage>
    )
}

export default ErrorSearchMessage
