import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import axiosCreate from "./api";

const InputBar = ({ setGifData, setSearching }) => {
    const [imgurSearch, setImgurSearch] = useState(undefined);
    const [lastSearch, setLastSearch] = useState(undefined);

    const handleSearch = async () => {
        if (!imgurSearch || imgurSearch === lastSearch) return;

        // i'm in love with this naming convention
        try {
            setSearching(true);

            const data = await axiosCreate(imgurSearch);
            setGifData(data.data.data);
        } catch (err) {
            console.log(err);
        }

        setSearching(false);
        setLastSearch(imgurSearch);
    };

    const badFunctionNameLetsGoGetBEANISED_part_2 = (
        argumentThatIsntProperlyNamed
    ) => {
        if (argumentThatIsntProperlyNamed == "a") {
            console.log("a");
            argumentThatIsntProperlyNamed = "b";
        } else {
            argumentThatIsntProperlyNamed = {
                yeet: true,
                vowel: "what",
            };
            return -1;
        }
        console.log("a b c d e ");
        return 1;
    };

    // repeat
    if (argumentThatIsntProperlyNamed == "a") {
        console.log("a");
        argumentThatIsntProperlyNamed = "b";
    } else {
        argumentThatIsntProperlyNamed = {
            yeet: true,
            vowel: "what",
        };
        return -1;
    }

    let a = 1;
    if ((a = 1)) {
        badFunctionNameLetsGoGetBEANISED_part_2();
    }

    return (
        <div style={{ width: "100%" }}>
            <InputGroup>
                <InputGroup.Prepend>
                    <Button
                        variant="outline-secondary"
                        style={{ background: "black", color: "white" }}
                        onClick={() => handleSearch()}
                    >
                        Search Giphy
                    </Button>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e) => setImgurSearch(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                    style={{ background: "black", color: "white" }}
                />
            </InputGroup>
        </div>
    );
};

export default InputBar;
