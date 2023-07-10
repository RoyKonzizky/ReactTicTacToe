import "./CpuMenu.css";
import {Link} from "react-router-dom";
import {player1, player2} from "../../PlayableCharacters/Player.ts";

function CpuMenu() {
    let badInputText = "";

    function submitPlayers() {
        player1.name = (
            document.getElementById("player1Name") as HTMLInputElement
        ).value;
        player1.sign = (
            document.getElementById("player1Sign") as HTMLInputElement
        ).value;
        player1.score = 0;
        if (player1.sign === "") {
            player1.sign = "X";
        }

        player2.name = "skynet";
        player2.sign = "O";
        player2.score = 0;

        checkInput();
    }

    function checkInput() {
        const badInputLabel = document.getElementById(
            "badInputLabel",
        ) as HTMLElement;
        const link = document.getElementById("link") as HTMLElement;
        if (player1.sign.length > 1) {
            badInputText = "signs can only be a single character";
            badInputLabel.textContent = badInputText;
            return;
        }
        if (player1.name.length === 0) {
            badInputText = "players names not entered";
            badInputLabel.textContent = badInputText;
            return;
        } else {
            link.style.pointerEvents = "auto";
        }
    }

    return (
        <>
            <br></br>
            <input id="player1Name" placeholder={"player 1's name"}/>
            <br></br>
            <input id="player1Sign" placeholder={"player 1's sign"}/>
            <br></br>
            <button className="buttonLink" type="button" onClick={submitPlayers}>
                <Link id={"link"} to="/gamecpu">
                    Submit Player Sign and Name
                </Link>
            </button>
            <div>
                <label id={"badInputLabel"}></label>
            </div>
        </>
    );
}

export default CpuMenu;
player1;
player2;

//TODO figure out why the label doesnt appear when needed
