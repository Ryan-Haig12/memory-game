import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import axiosCreate from './api'

const InputBar = ({ setGifData }) => {
    const [ imgurSearch, setImgurSearch ] = useState(undefined)
    const [ lastSearch, setLastSearch ] = useState(undefined)

    const handleSearch = async () => {
        if(!imgurSearch || imgurSearch === lastSearch) return

        // i'm in love with this naming convention
        const data = await axiosCreate(imgurSearch)
        setGifData(data.data.data)

        setLastSearch(imgurSearch)
    }

    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <Button
                        variant="outline-secondary"
                        onClick={ () => handleSearch() }
                    >
                        Button
                    </Button>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={ e => setImgurSearch(e.target.value) }
                    onKeyPress={ e => { if(e.key === 'Enter') handleSearch() } }
                />
            </InputGroup>
        </div>
    )
}

export default InputBar