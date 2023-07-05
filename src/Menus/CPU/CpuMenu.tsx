import './CpuMenu.css';
import { Link } from "react-router-dom";
import {player1, player2} from "../../Player.tsx";


function CpuMenu() {
    let badInputText="";
    const badInputLabel = document.getElementById("badInputLabel") as HTMLElement;
    const buttonLink : HTMLButtonElement = document.getElementById("buttonLink") as HTMLButtonElement;
    function submitNames() {
        player1.name = (document.getElementById("player1Name") as HTMLInputElement).value;
        player1.sign = (document.getElementById("player1Sign") as HTMLInputElement).value;
        player1.score = 0;

        if (player1.sign===""){
            player1.sign = "X";
        }

        if (player1.sign.length>1){
            badInputText = "signs can only be a single character";
            badInputLabel.innerText = badInputText;
            buttonLink.disabled = true;
        }
        player2.name="skynet";
        player2.sign="O";
        player2.score=0;
    }

    return (
        <>
            <br></br>
            <input id="player1Name" placeholder={"player 1's name"}/>
            <br></br>
            <input id="player1Sign" placeholder={"player 1's sign"} />
            <br></br>
            <Link to="/gamecpu">
                <button className="buttonLink" type="button" onClick={submitNames}>
                    Submit Player Sign and Name
                </button>
            </Link>
            <label id={"badInputLabel"}></label>
        </>
    );
}

export default CpuMenu;player1;
