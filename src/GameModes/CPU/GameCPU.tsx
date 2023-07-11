import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import "./GameCPU.css";
import {Player, player1, player2} from "../../PlayableCharacters/Player.ts";

function GameCPU() {
    let countTurn = 0;
    player1.sign = 'X';
    player2.sign = 'O';

    function winCondition(cellValues: string[]): string {
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
                cellValues[a] &&
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
        const winnerTextElement = document.getElementById(
            "winnerText",
        ) as HTMLElement;
        winnerTextElement.innerText = winnerText;
        winnerPopup.style.display = "block";
        overlay.style.display = "block";
    }

    function handleCellClick(cellId: string) {
        const cell = document.getElementById(cellId) as HTMLElement;
        if (cell.innerText === "") {
            let winnerText;
            const tieText = "it's a tie";
            cell.innerText = player1.sign;
            labelUpdate(player1, player2);
            const cells = document.getElementsByClassName("cell") as HTMLCollection;
            const cellValues = Array.from(cells).map((cell) => cell.textContent);
            let cellChosen: HTMLElement;

            countTurn++;
            console.log(countTurn);

            const winSign = winCondition(cellValues);

            const aiChoice: number = minmax(cellValues, player2.sign, player1.sign, 0);
            if (aiChoice <= 8 && aiChoice >= 0) {
                cellChosen = document.getElementById(aiChoice.toString()) as HTMLElement;
                if (cellChosen.textContent === "") {
                    cellChosen.textContent = player2.sign;
                }
            }

            if (winSign) {
                if (winSign === player1.sign) {
                    player1.score += 1;
                    countTurn = 0;
                    winnerText = player1.name + " is the winner";
                    showWinnerPopup(winnerText);
                } else if (winSign === player2.sign) {
                    player2.score += 1;
                    countTurn = 0;
                    winnerText = player2.name + " is the winner";
                    showWinnerPopup(winnerText);
                }
            }
            if (countTurn === 5) {
                countTurn = 0;
                showWinnerPopup(tieText);
            }
        }
    }


    function minmax(board: (string)[], maximizingPlayer: string, currentPlayer: string, depth: number): number {
        const availableMoves = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                availableMoves.push(i);
            }
        }

        if (winCondition(board) === player1.sign) {
            return -10 + depth;
        } else if (winCondition(board) === player2.sign) {
            return 10 - depth;
        } else if (availableMoves.length === 0) {
            return 0;
        }

        let bestScore: number;
        let bestMove: number;

        if (currentPlayer === player2.sign) {
            bestScore = -Infinity;
            for (let i = 0; i < availableMoves.length; i++) {
                const move = availableMoves[i];
                board[move] = currentPlayer;
                const score = minmax(board, maximizingPlayer, player1.sign, depth + 1);
                board[move] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
        } else {
            bestScore = Infinity;
            for (let i = 0; i < availableMoves.length; i++) {
                const move = availableMoves[i];
                board[move] = currentPlayer;
                const score = minmax(board, maximizingPlayer, player2.sign, depth + 1);
                board[move] = "";
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
        }

        if (currentPlayer === maximizingPlayer) {
            return bestScore;
        } else {
            return bestMove;
        }
    }



    function resetBoard() {
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
        }
        const winnerPopup = document.getElementById("winnerPopup") as HTMLElement;
        winnerPopup.style.display = "none";
        const overlay = document.getElementById("overlay") as HTMLElement;
        overlay.style.display = "none";
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
                        ></Grid>
                    ))}
                </Grid>
            </div>
        );
    }

    return (
        <div>
            <div className="grid-container">{createGrid()}</div>

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

export default GameCPU;

//work with figma
//TODO add onchange to input fields with funcs that if they return true the link activate
//TODO fix the win call, fix the bug that steals place
//TODO iron-out bugs and clean up.