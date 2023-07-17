import "./PvpMenu.css";
import {player1, player2} from "../../PlayableCharacters/Player.ts";
import {Link} from "react-router-dom";

function PvpMenu() {
    let badInputText = "";

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
        const badInputLabel = document.getElementById("badInputLabel") as HTMLElement;
        const link = document.getElementById("link") as HTMLElement;

        // if (imageExists(player1.sign) || imageExists(player2.sign)) {
        //     badInputText = "image not found, enter a different path";
        //     badInputLabel.textContent = badInputText;
        //     return;
        // }

        if (player1.sign === "" || player2.sign === "") {
            badInputText = "image not found, enter a different path";
            badInputLabel.textContent = badInputText;
            return;
        }

        if (player1.name.length === 0 || player2.name.length === 0) {
            badInputText = "players names not entered";
            badInputLabel.textContent = badInputText;
            return;
        } else {
            link.style.pointerEvents = "auto";
        }
    }

    // function imageExists(imagePath):boolean{
    //     if(){
    //         return true;
    //     }
    //     return false
    // }

    return (
        <>
            <div>
                <input id="player1Name" placeholder={"player 1's name"}/>
            </div>

            <div>
                <input id="player1Sign" placeholder={"player 1's sign"}/>
            </div>

            <div>
                <input id="player2Name" placeholder={"player 2's name"}/>
            </div>

            <div>
                <input id="player2Sign" placeholder={"player 2's sign"}/>
            </div>

            <div>
                <button className="buttonLink" type="button" onClick={submitPlayers}>
                    <Link id="link" to="/gamepvp">
                        Submit Player Sign and Name
                    </Link>
                </button>
            </div>

            <div>
                <label id={"badInputLabel"}></label>
            </div>
        </>
    );
}

export default PvpMenu;
player1;
player2;

//TODO fix the link button, find a way to change it's 'to' attribute
