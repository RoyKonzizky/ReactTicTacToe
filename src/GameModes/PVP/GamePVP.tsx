import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import "./GamePVP.css";
import {Player, player1, player2} from "../../PlayableCharacters/Player.ts";

function GamePVP() {
    let currentSign = player1.sign;
    let currentName = player1.name;
    let countTurn = 0;

    function winCondition(): string {
        const cellValues: string[] = [];
        const cells: HTMLCollectionOf<Element> =
            document.getElementsByClassName("cell");

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

    function labelUpdate(player1: Player, player2: Player) {
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

    function handleCellClick(cellId: string) {
        const cell = document.getElementById(cellId) as HTMLElement;
        const currentNameLabel = document.getElementById("currentPlayer") as HTMLElement;
        const currentSignLabel = document.getElementById("currentSign") as HTMLElement;

        if (cell.innerText === "") {
            let winnerText;
            const tieText = "it's a tie";
            cell.innerText = currentSign;

            const imageForSign = document.createElement("img");
            imageForSign.src = currentSign === player1.sign ? "X.svg.png" : "o.png";
            cell.innerHTML = "";
            cell.appendChild(imageForSign);

            currentSign = currentSign === player1.sign ? player2.sign : player1.sign;
            currentName = currentName === player1.name ? player2.name : player1.name;

            currentNameLabel.textContent = "current player: " + currentName;
            currentSignLabel.textContent = "current sign: " + currentSign;
            labelUpdate(player1, player2);
            const winSign = winCondition();
            countTurn++;

            if (winSign) {
                if (winSign === player1.sign) {
                    player1.score += 1;
                    countTurn = 0;
                    winnerText = player1.name + " is the winner";
                    currentName = player2.name;
                    currentSign = player2.sign;
                    showWinnerPopup(winnerText);
                }
                if (winSign === player2.sign) {
                    player2.score += 1;
                    countTurn = 0;
                    winnerText = player2.name + " is the winner";
                    currentName = player1.name;
                    currentSign = player1.sign;
                    showWinnerPopup(winnerText);
                }
            }
            if (countTurn === 9) {
                countTurn = 0;
                showWinnerPopup(tieText);
                currentName = currentName === player1.name ? player2.name : player1.name;
            }
        }
        cell.style.pointerEvents = 'none';
    }

    function createGrid() {
        const cellIds: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

        return (
            <div className="grid-container">
                <Grid className={"grid"} container spacing={1}>
                    {cellIds.map((cellId) => (
                        <Grid
                            key={cellId}
                            id={cellId}
                            className={"cell"}
                            onClick={() => handleCellClick(cellId)}
                            item
                            xs={3}
                        >
                            <img src="" alt=""/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }


    function resetBoard() {
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
            const cell = cells[i] as HTMLElement;
            cell.style.pointerEvents = 'auto';
        }
        const winnerPopup = document.getElementById("winnerPopup") as HTMLElement;
        winnerPopup.style.display = "none";
        const overlay = document.getElementById("overlay") as HTMLElement;
        overlay.style.display = "none";
    }

    return (
        <div>
            <div className="grid-container">{createGrid()}</div>

            <div>
                <label className={"label"} id={"currentPlayer"}>
                    current player:{""}
                </label>
            </div>

            <div>
                <label className={"label"} id={"currentSign"}>
                    current sign:{""}
                </label>
            </div>

            <div>
                <label className={"label"} id={"scorePlayer1"}>
                    player 1's score:{""}
                </label>
            </div>

            <div>
                <label className={"label"} id={"scorePlayer2"}>
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

export default GamePVP;

//work with figma
//TODO fix winCon