import {player1, player2} from "../../Player.ts";
import {useEffect, useState} from "react";
import {
    Container,
    CustomHeader,
    CustomInput,
    CustomLink,
    DivLinkLabel,
    ErrorLabel,
    ImgSlot,
    LabelDiv,
    LinkDiv,
    PlayerDiv,
    PlayerLabel
} from "./CpuMenu.Styled.ts";
import Dropzone from "react-dropzone";

function CpuMenu() {
    const [toValue, setToValue] = useState('');
    const [error, setError] = useState('');
    const [p1Check, setP1Check] = useState(false);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name] = useState('Skynet');
    const [player1Sign, setPlayer1Sign] = useState("x.png");
    const [player2Sign] = useState("o.png");

    useEffect(() => {
        submitPlayers();
    }, [player1Name, player2Name, player1Sign, player2Sign]);

    const handlePlayer1NameChange = (event: any) => {
        setPlayer1Name(event.target.value);
    };

    const onDropPlayer1Sign = (acceptedFiles: any) => {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setPlayer1Sign(imageUrl);
    };

    function submitPlayers() {
        player1.name = player1Name;
        player2.name = player2Name;

        player1.sign = player1Sign;
        player2.sign = player2Sign;

        player1.score = 0;
        player2.score = 0;

        if (player1.sign === "") {
            setPlayer1Sign("x.png");
            setP1Check(true);
        }
        checkInput();
    }

    function checkInput() {
        checkIfImageExists(player1.sign, (existsP1: any) => {
            if (existsP1) {
                setP1Check(true);
            } else {
                setP1Check(false);
                setToValue('');
                setError("player1, change image path");
            }
        });

        if (player1.name.length === 0) {
            setError("player1, add name");
            setToValue('');
        }
        if (player2.name.length === 0) {
            setError("player2, add name");
            setToValue('');
        }

        if (player1.name.length > 0 && p1Check) {
            setToValue('/gamecpu');
            setError('');
        }
    }

    function showLabel() {
        if (toValue === "" && !error) {
            setError("input not entered");
        }
    }

    const checkIfImageExists = (url: string, callback: any) => {
        const img = new Image();
        img.src = url;

        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };

            img.onerror = () => {
                callback(false);
            };
        }
    };

    return (
        <div>
            <Container>
                <PlayerDiv>
                    <PlayerLabel>Player 1:</PlayerLabel>
                    <CustomInput
                        id="player1Name"
                        placeholder={"player 1's name"}
                        onChange={handlePlayer1NameChange}
                        value={player1Name}
                    />

                    <div>
                        <CustomHeader>Player 1's Sign:</CustomHeader>
                        <div>
                            <Dropzone onDrop={onDropPlayer1Sign}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                        {player1Sign && <ImgSlot src={player1Sign} alt="Player 1's Sign"/>}
                                        {!player1Sign && <p>Drop an image here or click to select one.</p>}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                </PlayerDiv>
            </Container>

            <DivLinkLabel>
                <LinkDiv className="linkDiv">
                    <CustomLink to={toValue} onClick={showLabel}>
                        Submit
                    </CustomLink>
                </LinkDiv>

                <LabelDiv>
                    <ErrorLabel className={error ? "errorLabel visible" : "errorLabel"}>
                        {error}
                    </ErrorLabel>
                </LabelDiv>

                <LinkDiv className="linkDiv">
                    <CustomLink to={"/"}>
                        Mode Selection
                    </CustomLink>
                </LinkDiv>
            </DivLinkLabel>
        </div>
    );
}

export default CpuMenu;
player1;