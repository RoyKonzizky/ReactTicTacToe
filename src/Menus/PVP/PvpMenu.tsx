import {player1, player2} from "../../PlayableCharacters/Player.ts";
import {useState} from "react";
import {
    Container,
    CustomInput,
    CustomLink,
    DivLinkLabel,
    ErrorLabel,
    LabelDiv,
    LinkDiv,
    PlayerDiv,
    PlayerLabel
} from "./PvpMenu.Styled.ts";

function PvpMenu() {

    const [toValue, setToValue] = useState('');
    const [error, setError] = useState('');
    const [p1Check, setP1Check] = useState(false);
    const [p2Check, setP2Check] = useState(false);

    function submitPlayers() {
        player1.name = (document.getElementById("player1Name") as HTMLInputElement).value;
        player2.name = (document.getElementById("player2Name") as HTMLInputElement).value;

        player1.sign = (document.getElementById("player1Sign") as HTMLInputElement).value;
        player2.sign = (document.getElementById("player2Sign") as HTMLInputElement).value;

        player1.score = 0;
        player2.score = 0;

        if (player1.sign === "") {
            player1.sign = "X.svg.png";
            setP1Check(true);
        }
        if (player2.sign === "") {
            player2.sign = "o.png";
            setP2Check(true);
        }
        checkInput();
    }

    function checkInput() {
        checkIfImageExists(player1.sign, (existsP1) => {
            if (existsP1) {
                setP1Check(true);
            } else {
                setP1Check(false);
                setToValue('');
                setError("player1, change image path");
            }
        });

        checkIfImageExists(player2.sign, (existsP2) => {
            if (existsP2) {
                setP2Check(true);
            } else {
                setP2Check(false);
                setToValue('');
                setError("player2, change image path");
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

        if (player1.name.length > 0 && player2.name.length > 0 && p1Check && p2Check) {
            setToValue('/gamepvp');
            setError('');
        }
        // console.log(player1.sign);
        // console.log(p1Check);
        // //Problem: when empty hook returns false
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
            <Container>
                <PlayerDiv>
                    <PlayerLabel>Player 1:</PlayerLabel>
                    <CustomInput id="player1Name" placeholder={"player 1's name"} onChange={submitPlayers}/>
                    <CustomInput id="player1Sign" placeholder={"player 1's sign"} onChange={submitPlayers}/>
                </PlayerDiv>

                <PlayerDiv>
                    <PlayerLabel>Player 2:</PlayerLabel>
                    <CustomInput id="player2Name" placeholder={"player 2's name"} onChange={submitPlayers}/>
                    <CustomInput id="player2Sign" placeholder={"player 2's sign"} onChange={submitPlayers}/>
                </PlayerDiv>
            </Container>


            <DivLinkLabel>
                <LinkDiv className="linkDiv">
                    <CustomLink className="link" to={toValue} onClick={showLabel}>
                        Submit Players Signs and Names
                    </CustomLink>
                </LinkDiv>

                <LabelDiv>
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

//TODO fix the bug with the default signs not coming back unless changing the name