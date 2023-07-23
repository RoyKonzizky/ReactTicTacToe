import {player1, player2} from "../../PlayableCharacters/Player.ts";
import {Link} from "react-router-dom";
import {useState} from "react";
import {DivLinkLabel, ErrorLabel, InputDiv, LabelDiv, LinkDiv, NamesDiv, SignsDiv} from "./PvpMenu.Styled.ts";
import "./PvpMenu.css"

function PvpMenu() {

    const [toValue, setToValue] = useState('');
    const [error, setError] = useState('');

    function submitPlayers() {
        player1.name = (document.getElementById("player1Name") as HTMLInputElement).value;
        player2.name = (document.getElementById("player2Name") as HTMLInputElement).value;

        player1.sign = (document.getElementById("player1Sign") as HTMLInputElement).value;
        player2.sign = (document.getElementById("player2Sign") as HTMLInputElement).value;

        player1.score = 0;
        player2.score = 0;

        if (player1.sign === "") {
            player1.sign = "X.svg.png";
        }
        if (player2.sign === "") {
            player2.sign = "o.png";
        }
        checkInput();
    }

    function checkInput() {
        checkIfImageExists(player1.sign, (existsP1) => {
            if (existsP1) {
                setToValue('/gamepvp');
                setError('');
            } else {
                setError("Image not found. Player1, enter a different path");
                setToValue('');
            }
        });

        checkIfImageExists(player2.sign, (existsP2) => {
            if (existsP2) {
                setToValue('/gamepvp');
                setError('');
            } else {
                setError("Image not found. Player2, enter a different path");
                setToValue('');
            }
        });

        if (player1.name.length === 0 || player2.name.length === 0) {
            setError("players names not entered");
            setToValue('');
        } else {
            setToValue('/gamepvp');
        }

    }

    function showLabel() {
        if (toValue === "" && !error) {
            setError("input not entered");
        }
    }

    const checkIfImageExists = (url: string, callback: (exists: boolean) => void) => {
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

            <InputDiv className="inputDiv">
                <NamesDiv className="namesDiv">
                    <input id="player1Name" placeholder={"player 1's name"} onChange={submitPlayers}/>
                    <input id="player1Sign" placeholder={"player 1's sign"} onChange={submitPlayers}/>
                </NamesDiv>

                <SignsDiv className="signsDiv">
                    <input id="player2Name" placeholder={"player 2's name"} onChange={submitPlayers}/>
                    <input id="player2Sign" placeholder={"player 2's sign"} onChange={submitPlayers}/>
                </SignsDiv>
            </InputDiv>

            <DivLinkLabel className="divLinkLabel">
                <LinkDiv className="linkDiv">
                    <Link className="link" to={toValue} onClick={showLabel}>
                        Submit Player Sign and Name
                    </Link>
                </LinkDiv>

                <LabelDiv className={"labelDiv"}>
                    <ErrorLabel className={error ? "errorLabel visible" : "errorLabel"}>
                        {error}
                    </ErrorLabel>
                </LabelDiv>
            </DivLinkLabel>

        </div>
    );
}

export default PvpMenu;
player1;
player2;
