import './PvpMenu.css';
import { Link } from "react-router-dom";
import {player1, player2} from "../../Player.tsx";


function PvpMenu() {
    let badInputText="";
    const badInputLabel = document.getElementById("badInputLabel") as HTMLElement;
    const buttonLink : HTMLButtonElement = document.getElementById("buttonLink") as HTMLButtonElement;
    function submitNames() {
        player1.name = (document.getElementById("player1Name") as HTMLInputElement).value;
        player2.name = (document.getElementById("player2Name") as HTMLInputElement).value;
        player1.sign = (document.getElementById("player1Sign") as HTMLInputElement).value;
        player2.sign = (document.getElementById("player2Sign") as HTMLInputElement).value;
        player1.score = 0;
        player2.score = 0;

        if (player1.sign===""){
            player1.sign = "X";
        }
        if (player2.sign===""){
            player2.sign = "O";
        }

        if (player1.sign.length>1||player2.sign.length>1){
            badInputText = "signs can only be a single character";
            badInputLabel.innerText = badInputText;
            buttonLink.disabled = true;
        }
        if(player1.name.length===0 || player2.name.length===0){
            badInputText = "players names not entered";
            badInputLabel.innerText = badInputText;
            buttonLink.disabled = true;
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
            <Link to="/gamepvp">
                <button className="buttonLink" type="button" onClick={submitNames}>
                    Submit Player Sign and Name
                </button>
            </Link>
            <label id={"badInputLabel"}></label>
        </>
    );
}

export default PvpMenu;player1;player2;
