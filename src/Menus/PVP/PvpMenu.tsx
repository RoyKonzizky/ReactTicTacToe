import "./PvpMenu.css";
import {player1, player2} from "../../PlayableCharacters/Player.ts";
import {Link} from "react-router-dom";
import {useState} from "react";

function PvpMenu() {
    let badInputText = "";
    const [toValue, setToValue] = useState('');
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

        // if (imageExists(player1.sign) || imageExists(player2.sign)) {
        //     badInputText = "image not found, enter a different path";
        //     badInputLabel.textContent = badInputText;
        //     return;
        // }

        if (player1.name.length === 0 || player2.name.length === 0 || player1.sign === "" || player2.sign === ""){
            if (player1.sign === "" || player2.sign === "") {
                badInputText = "image not found, enter a different path";
                badInputLabel.textContent = badInputText;
                setToValue('');
            }
            if (player1.name.length === 0 || player2.name.length === 0) {
                badInputText = "players names not entered";
                badInputLabel.textContent = badInputText;
                setToValue('');
            }
        }else {
            setToValue('/gamepvp');
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
                <input id="player1Name" placeholder={"player 1's name"} onChange={submitPlayers}/>
            </div>

            <div>
                <input id="player1Sign" placeholder={"player 1's sign"} onChange={submitPlayers}/>
            </div>

            <div>
                <input id="player2Name" placeholder={"player 2's name"} onChange={submitPlayers}/>
            </div>

            <div>
                <input id="player2Sign" placeholder={"player 2's sign"} onChange={submitPlayers}/>
            </div>

            <div>
                <Link className="link" to={toValue}>
                    Submit Player Sign and Name
                </Link>
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
//ask roy why it doesnt work if i refer to it with id