import {Link} from "react-router-dom";
import {player1, player2} from "../../PlayableCharacters/Player.ts";
import {
    Cell,
    CellImage,
    Confetti,
    CustomGrid,
    GridContainer,
    GridWrapper,
    Label, Overlay,
    PlayerImg,
    PlayerInfoDiv, Popup, PopupButton, PopupHeader
} from "./GameCpu.Styled.ts";
import {useState} from "react";

function GameCPU() {
    const [p1score, setScoreP1] = useState(0);
    const [p2score, setScoreP2] = useState(0);
    const [countTurn, setCountTurn] = useState(0);
    player2.sign = "o.png";

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
            // const imgCell = document.getElementById(cellId) as HTMLImageElement;
            // imgCell.src = player1.sign;
            // imgCell.alt = player1.sign;

            const cells = document.getElementsByClassName("cell") as HTMLCollection;
            const cellValues = Array.from(cells).map((cell) => cell.textContent);

            setCountTurn(countTurn+1);

            let maxScoreCell = -1;
            let bestScore = -Infinity;
            for(let i = 0; i < cellValues.length; i++){
                if(cellValues[i] === ""){
                    cellValues[i] = player2.sign;
                    const score = minmax(cellValues, false, 0);
                    cellValues[i] = "";
                    if(bestScore < score){
                        maxScoreCell = i;
                        bestScore = score;
                    }
                }
            }

            const cellChosen = document.getElementById(maxScoreCell.toString()) as HTMLElement;
            // const imgBot = document.getElementById(`image-${maxScoreCell.toString()}`) as HTMLImageElement;
            if(cellChosen){
                if (cellChosen.textContent === "") {
                    cellChosen.textContent = player2.sign;
                    // imgBot.src = player2.sign;
                    // imgBot.alt = player2.sign;
                }
            }

            const cellValuesForWinCon = Array.from(cells).map((cell) => cell.textContent);
            const winSign = winCondition(cellValuesForWinCon);
            console.log(winSign);

            if (winSign) {
                if (winSign === player1.sign) {
                    player1.score += 1;
                    setScoreP1(player1.score);
                    setCountTurn(0);
                    winnerText = player1.name + " is the winner";
                    showWinnerPopup(winnerText);
                }
                if (winSign === player2.sign) {
                    player2.score += 1;
                    setScoreP2(player2.score);
                    setCountTurn(0);
                    winnerText = player2.name + " is the winner";
                    showWinnerPopup(winnerText);
                }
            }
            if (countTurn === 4) {
                setCountTurn(0);
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


            <GridContainer>{createGrid()}</GridContainer>

            <Overlay id="overlay">
                <Confetti id="conf"/>
            </Overlay>

            <Popup id="winnerPopup">
                <PopupHeader id="winnerText"/>
                <Link to="/">
                    <PopupButton id="retMenuButton">back to menu</PopupButton>
                </Link>
                <PopupButton id="boardReseter" onClick={resetBoard}>
                    reset grid
                </PopupButton>
            </Popup>
        </div>
    );
}

export default GameCPU;