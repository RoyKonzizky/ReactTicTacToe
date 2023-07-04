import { Grid } from "@mui/material";
import {Link} from "react-router-dom";
import "./Game.css";
import {Player, player1, player2} from "./Player.tsx";

function Game() {
    let currentSign = player1.sign;
    let currentName = player1.name;
    let countTurn = 0;

    function winCondition(): string {
        const cellValues: string[] = [];
        const cells: HTMLCollectionOf<Element> = document.getElementsByClassName("cell");

        for (let i = 0; i < cells.length; i++) {
            cellValues.push((cells[i] as HTMLDivElement).innerText);
        }

        const winConditions: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const condition of winConditions) {
            const [a, b, c]: number[] = condition;
            if (
                cellValues[a] !== "" &&
                cellValues[a] === cellValues[b] &&
                cellValues[a] === cellValues[c]
            ) {
                return cellValues[a];
            }
        }
        return "";
    }

    function labelUpdate(player1:Player, player2:Player) {
        const score1 = document.getElementById("scorePlayer1") as HTMLElement;
        score1.innerText = player1.name + "'s score: " + player1.score;
        const score2 = document.getElementById("scorePlayer2") as HTMLElement;
        score2.innerText = player2.name + "'s score: " + player2.score;
    }

    function showWinnerPopup(winnerText: string): void {
        const winnerPopup = document.getElementById("winnerPopup") as HTMLElement;
        const overlay = document.getElementById("overlay") as HTMLElement;
        const winnerTextElement = document.getElementById("winnerText") as HTMLElement;
        winnerTextElement.innerText = winnerText;
        winnerPopup.style.display = "block";
        overlay.style.display = "block";
    }


    function handleCellClick(cellId : string) {
        const cell = document.getElementById(cellId) as HTMLElement;
        if(cell.innerText===""){
            let winnerText;
            const tieText = "both of you suck dudes";
            cell.innerText = currentSign;
            currentSign = currentSign === player1.sign ? player2.sign : player1.sign;
            currentName = currentName === player1.name ? player2.name : player1.name;
            labelUpdate(player1,player2);
            const winSign = winCondition();
            countTurn++;
            if(winSign){
                if(winSign===player1.sign){
                    player1.score+=1;
                    countTurn=0;
                    winnerText = player1.name + " is the winner";
                    showWinnerPopup(winnerText);
                }
                if(winSign===player2.sign){
                    player2.score+=1;
                    countTurn=0;
                    winnerText = player2.name + " is the winner";
                    showWinnerPopup(winnerText);
                }
            }
            if(countTurn===9){
                countTurn=0;
                showWinnerPopup(tieText);
            }
        }
    }

    function resetBoard() {
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
        }
        const winnerPopup = document.getElementById("winnerPopup") as HTMLElement;
        winnerPopup.style.display = 'none';
        const overlay = document.getElementById("overlay") as HTMLElement;
        overlay.style.display = 'none';
    }

    /*function createGrid(){
        //implement this
    }*/

    return (
        <div>
            <div className="grid-container" >
                <Grid className={"grid"} container spacing={1}>
                    <Grid
                        id={"0"}
                        className={"cell"}
                        onClick={() => handleCellClick("0")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"1"}
                        className={"cell"}
                        onClick={() => handleCellClick("1")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"2"}
                        className={"cell"}
                        onClick={() => handleCellClick("2")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"3"}
                        className={"cell"}
                        onClick={() => handleCellClick("3")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"4"}
                        className={"cell"}
                        onClick={() => handleCellClick("4")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"5"}
                        className={"cell"}
                        onClick={() => handleCellClick("5")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"6"}
                        className={"cell"}
                        onClick={() => handleCellClick("6")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"7"}
                        className={"cell"}
                        onClick={() => handleCellClick("7")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"8"}
                        className={"cell"}
                        onClick={() => handleCellClick("8")}
                        item
                        xs={3}
                    ></Grid>
                </Grid>
            </div>

            <div id={"labelContainer"}>
                <label className={"label"} id={"currentPlayer"}>
                    current player:{""}
                </label>

                <label className={"label"} id={"currentSign"}>
                    current sign:{""}
                </label>

                <label className={"label"} id={"scorePlayer1"}>
                    player 1's score:{""}
                </label>

                <label id={"scorePlayer2"}>
                    player 2's score:{""}
                </label>
            </div>

            <div id="overlay" className="overlay"></div>

            <div id="winnerPopup" className="popup">
                <h2 id="winnerText"></h2>
                <Link to="/">
                    <button type="button" id={"retMenuButton"}>
                        back to menu
                    </button>
                </Link>
                <button id={"boardReseter"} onClick={resetBoard}>
                    reset grid
                </button>
            </div>

        </div>
    );
}

export default Game;

//add pvp and vs cpu
//work with figma
//to fix the errors create a metric ton of consts and add " as HTMLElement" or whatever it is they have