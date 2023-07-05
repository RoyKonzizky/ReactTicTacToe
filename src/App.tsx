import './App.css';
import { Link } from "react-router-dom";
import { player1, player2 } from "./Player.tsx";

function App() {
    function submitNames() {
        const badInputLabel = document.getElementById("badInputLabel") as HTMLElement;
        const buttonLink = document.getElementById("buttonLink") as HTMLElement;
        const linkOfButton = document.getElementById("linkOfButton") as HTMLElement;

        player1.name = (document.getElementById("player1Name") as HTMLInputElement).value;
        player1.sign = (document.getElementById("player1Sign") as HTMLInputElement).value;
        player1.score = 0;
        if (player1.sign === "") {
            player1.sign = "X";
        }

        player2.name = (document.getElementById("player2Name") as HTMLInputElement).value;
        player2.sign = (document.getElementById("player2Sign") as HTMLInputElement).value;
        player2.score = 0;
        if (player2.sign === "") {
            player2.sign = "O";
        }

        if (player1.sign.length > 1 || player2.sign.length > 1) {
            badInputLabel.innerText = "Signs can only be a single character";
            buttonLink.style.pointerEvents = "none";
            linkOfButton.style.pointerEvents = "none";
        }
        if (player1.name.length === 0 || player2.name.length === 0) {
            badInputLabel.innerText = "Players names not entered";
            buttonLink.style.pointerEvents = "none";
            linkOfButton.style.pointerEvents = "none";
        }
        if(player1.name.length === 0 && player2.name.length === 0 && player1.sign.length > 1 && player2.sign.length > 1){
            badInputLabel.innerText = "";
            buttonLink.style.pointerEvents = "auto";
            linkOfButton.style.pointerEvents = "auto";
        }
    }

    return (
        <>
            <br />
            <input id="player1Name" placeholder={"player 1's name"} />
            <br />
            <input id="player1Sign" placeholder={"player 1's sign"} />
            <br />
            <input id="player2Name" placeholder={"player 2's name"} />
            <br />
            <input id="player2Sign" placeholder={"player 2's sign"} />
            <br />
            <Link id="linkOfButton" to="/game">
                <button id="buttonLink" type="button" onClick={submitNames}>
                    Submit Player Sign and Name
                </button>
            </Link>
            <label id="badInputLabel"></label>
        </>
    );
}

export default App;
//TODO find a way to disable the link and button