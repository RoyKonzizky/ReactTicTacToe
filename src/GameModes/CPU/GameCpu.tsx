import {Link} from "react-router-dom";
import "./GameCPU.css";
import {Player, player1, player2} from "../../PlayableCharacters/Player.ts";
import {
    Cell,
    CellImage, CurrentLabelDiv, CurrLabelName, CurrLabelSign,
    CustomGrid,
    GridContainer,
    GridWrapper, ImgLbl,
    Label, Overlay,
    PlayerImg,
    PlayerInfoDiv, Popup, PopupButton, PopupHeader
} from "../PVP/GamePvp.Styled.ts";
import ReactConfetti from "react-confetti";
import {useState} from "react";

function GameCPU() {
    const [currentSign, setCurrentSign] = useState(player1.sign);
    const [currentName, setCurrentName] = useState(player1.name);
    const [p1score, setScoreP1] = useState(0);
    const [p2score, setScoreP2] = useState(0);
    const [count, setCount] = useState(0);
    let countTurn = 0;

    function winCondition(cellValues: (string | null)[]): string | null {
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
        if (cell.textContent === "") {
            let winnerText;
            const tieText = "it's a tie";
            cell.textContent = player1.sign;
            labelUpdate(player1, player2);
            const cells = document.getElementsByClassName("cell") as HTMLCollection;
            const cellValues = Array.from(cells).map((cell) => cell.textContent);

            countTurn++;

            let maxScoreCell = -1;
            let bestScore = -Infinity;
            for(let i = 0; i < cellValues.length; i++){
                if(cellValues[i] === ""){
                    console.log(cellValues[i]);
                    cellValues[i] = player2.sign;
                    console.log(cellValues[i]);
                    const score = minmax(cellValues, false, 0);
                    cellValues[i] = "";
                    if(bestScore < score){
                        maxScoreCell = i;
                        bestScore = score;
                    }
                }
            }


            const cellChosen = document.getElementById(maxScoreCell.toString()) as HTMLElement;

            if(cellChosen){
                if (cellChosen.textContent === "") {
                    cellChosen.textContent = player2.sign;
                }
            }

            const cellValuesForWinCon = Array.from(cells).map((cell) => cell.textContent);
            const winSign = winCondition(cellValuesForWinCon);

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


    function minmax(board: (string | null)[], isMaximizing: boolean, depth: number): number {
        const availableMoves = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                availableMoves.push(i);
            }
        }

        const winCon = winCondition(board);

        if (winCon === player1.sign) {
            return -10;
        } else if (winCon === player2.sign) {
            return 10;
        } else if (availableMoves.length === 0) {
            return 0;
        }

        let bestScore:number;

        if (isMaximizing) {
            bestScore = -Infinity;
            for (let i = 0; i < availableMoves.length; i++) {
                const move = availableMoves[i];
                board[move] = player2.sign;
                const score = minmax(board, !isMaximizing, depth + 1);
                board[move] = "";
                bestScore = Math.max(bestScore, score);
            }
        } else {
            bestScore = Infinity;
            for (let i = 0; i < availableMoves.length; i++) {
                const move = availableMoves[i];
                board[move] = player1.sign;
                const score = minmax(board, !isMaximizing, depth + 1);
                board[move] = "";
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
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
                <GridContainer>
                    <GridWrapper>
                        <CustomGrid container spacing={2}>
                            {cellIds.map((cellId) => (
                                <Cell
                                    key={cellId}
                                    id={cellId}
                                    className={"cell"}
                                    onClick={() => handleCellClick(cellId)}
                                >
                                    <CellImage
                                        id={`image-${cellId}`}
                                        className={"cell-image"}
                                        src=""
                                        alt=""
                                    />
                                </Cell>
                            ))}
                        </CustomGrid>
                    </GridWrapper>
                </GridContainer>
            </div>
        );
    }

    return (
        <div>
            <PlayerInfoDiv>
                <Label id="player1Label">
                    <PlayerImg id="player1Img" src={player1.sign} alt="X"/>: {player1.name} - {p1score}
                </Label>
                <Label id="player2Label">
                    <PlayerImg id="player2Img" src={player2.sign} alt="O"/>: {player2.name} - {p2score}
                </Label>
            </PlayerInfoDiv>

            <div className="grid-container">{createGrid()}</div>

            <CurrentLabelDiv>
                <CurrLabelName>
                    <Label id={"currentPlayer"}>current player: {currentName}</Label>
                </CurrLabelName>
                <CurrLabelSign>
                    <Label id={"currentSign"}>current sign: <ImgLbl id="imgLbl" src={currentSign} alt=""/></Label>
                </CurrLabelSign>
            </CurrentLabelDiv>

            <Overlay id="overlay">
                <ReactConfetti id="conf"/>
            </Overlay>

            <Popup id="winnerPopup">
                <PopupHeader id="winnerText"/>
                <Link to="/leaderboard">
                    <PopupButton id="leadboardButton" onClick={addToLeaderboard}>leaderboard</PopupButton>
                </Link>
                <Link to="/">
                    <PopupButton id="retMenuButton" onClick={addToLeaderboard}>back to menu</PopupButton>
                </Link>
                <PopupButton id="boardReseter" onClick={resetBoard}>
                    reset grid
                </PopupButton>
            </Popup>
        </div>
    );
}

export default GameCPU;