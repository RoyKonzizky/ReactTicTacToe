import {Link} from "react-router-dom";
import {player1, player2} from "../../Player.ts";
import {
    Cell,
    CellImage,
    Confetti,
    CustomGrid,
    GridContainer,
    GridWrapper,
    Label,
    Overlay,
    PlayerImg,
    PlayerInfoDiv,
    Popup,
    PopupButton,
    PopupHeader
} from "../../Styles/GameModes/CPU/GameCpu.Styled.ts";
import {useState} from "react";

function GameCPU() {
    const [p1score, setScoreP1] = useState(0);
    const [p2score, setScoreP2] = useState(0);
    const [countTurn, setCountTurn] = useState(0);
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    const [showImgArray, setShowImgArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [winnerPopUpDisplay, setWinnerPopUpDisplay] = useState('none');
    const [overlayDisplay, setOverlayDisplay] = useState('none');
    const [confettiOpacity, setConfettiOpacity] = useState(0);
    const [winnerText, setWinnerText] = useState("");

    const winCondition = (cellValues: (string | null)[]) => {
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
    };

    const showWinnerPopup = (winnerText: string) => {
        setWinnerPopUpDisplay('block');
        setOverlayDisplay('block');
        if (winnerText === "it's a tie") {
            setConfettiOpacity(0);
        } else {
            setConfettiOpacity(1);
        }
        setWinnerText(winnerText);
    }

    const handleCellClick = (cellId: string) => {
        if (board[+cellId] === "") {
            const tieText = "it's a tie";
            const updatedBoardForPlayer = board.slice();
            updatedBoardForPlayer[+cellId] = player1.sign;
            setBoard(updatedBoardForPlayer);

            const updatedBoardForImgs = showImgArray.slice();
            updatedBoardForImgs[+cellId] = 1;
            setShowImgArray(updatedBoardForImgs);


            const updatedBoardForBot = board.slice();
            updatedBoardForBot[+cellId] = player1.sign;
            setBoard(updatedBoardForBot);
            setCountTurn(countTurn + 1);

            const bestMoveBot = bestMove(updatedBoardForBot);

            if (bestMoveBot !== -1) {
                updatedBoardForBot[bestMoveBot] = player2.sign;
                setBoard(updatedBoardForBot);

                const updatedBoardForImgsForBot = updatedBoardForImgs.slice();
                updatedBoardForImgsForBot[bestMoveBot] = 1;
                setShowImgArray(updatedBoardForImgsForBot);
            }

            const winSign = winCondition(updatedBoardForBot);
            if (winSign) {
                if (winSign === player1.sign) {
                    player1.score += 1;
                    setScoreP1(player1.score);
                    setCountTurn(0);
                    showWinnerPopup(player1.name + " is the winner");
                } else if (winSign === player2.sign) {
                    player2.score += 1;
                    setScoreP2(player2.score);
                    setCountTurn(0);
                    showWinnerPopup(player2.name + " is the winner");
                }
            }
            if (countTurn === 4) {
                setCountTurn(0);
                showWinnerPopup(tieText);
            }
        }
    };

    const bestMove = (updatedBoardForBot: string[]) => {
        let bestMove = -1;
        let bestScore = -Infinity;
        for (let i = 0; i < updatedBoardForBot.length; i++) {
            if (updatedBoardForBot[i] === "") {
                updatedBoardForBot[i] = player2.sign;
                const score = minmax(updatedBoardForBot, false, 0);
                updatedBoardForBot[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    const minmax = (board: (string | null)[], isMaximizing: boolean, depth: number) => {
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

        let bestScore: number;

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
    };


    const resetBoard = () => {
        setBoard(['', '', '', '', '', '', '', '', '']);
        setShowImgArray([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setCountTurn(0);
        setConfettiOpacity(0);
        setWinnerPopUpDisplay('none');
        setOverlayDisplay('none');
    }


    const createGrid = () => {
        const cellIds = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
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
                                    src={board[+cellId] === player1.sign ? player1.sign : board[+cellId] === player2.sign ? player2.sign : ""}
                                    alt={board[+cellId] === player1.sign ? "X" : board[+cellId] === player2.sign ? "O" : ""}
                                    style={{opacity: showImgArray[+cellId]}}
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

            <Overlay id="overlay"
                     style={{display: overlayDisplay}}>
                <Confetti id="conf"
                          style={{opacity: confettiOpacity}}/>
            </Overlay>

            <Popup
                style={{display: winnerPopUpDisplay}}
            >
                <PopupHeader>{winnerText}</PopupHeader>
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
