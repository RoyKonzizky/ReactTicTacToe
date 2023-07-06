import './PvpMenu.css';
import { Link } from "react-router-dom";
import {player1, player2} from "../../Player.tsx";


function PvpMenu() {
    let badInputText="";

    function submitPlayers() {
        player1.name = (document.getElementById("player1Name") as HTMLInputElement).value;
        player2.name = (document.getElementById("player2Name") as HTMLInputElement).value;
        player1.sign = (document.getElementById("player1Sign") as HTMLInputElement).value;
        player2.sign = (document.getElementById("player2Sign") as HTMLInputElement).value;
        player1.score = 0;
        player2.score = 0;

        if (player1.sign===""){
            player1.sign = "X";
        }
        else if (player2.sign===""){
            player2.sign = "O";
        }
        checkInput();
    }

    function checkInput() {
        const badInputLabel = document.getElementById("badInputLabel") as HTMLElement;
        const link = document.getElementById("link") as HTMLElement;
        if (player1.sign.length>1||player2.sign.length>1){

            badInputText = "signs can only be a single character";
            badInputLabel.textContent = badInputText;
            badInputLabel.style.display = "auto";
            return;
        }
        if(player1.name.length===0 || player2.name.length===0){
            badInputText = "players names not entered";
            badInputLabel.textContent = badInputText;
            badInputLabel.style.display = "auto";
            return;
        }
        else{
            link.style.pointerEvents = "auto";
        }
    }

    return (
        <>
            <br></br>
            <input id="player1Name" placeholder={"player 1's name"}/>
            <br></br>
            <input id="player1Sign" placeholder={"player 1's sign"} />
            <br></br>
            <input id="player2Name" placeholder={"player 2's name"} />
            <br></br>
            <input id="player2Sign" placeholder={"player 2's sign"} />
            <br></br>
            <button className="buttonLink" type="button" onClick={submitPlayers}>
                <Link id={"link"} to="/gamepvp">
                    Submit Player Sign and Name
                </Link>
            </button>

            <label id={"badInputLabel"}></label>
        </>
    );
}

export default PvpMenu;player1;player2;
