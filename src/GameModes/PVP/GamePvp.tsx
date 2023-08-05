import {useState} from "react";
import {Link} from "react-router-dom";
import {player1, player2} from "../../Player.ts";
import {
    Cell,
    CellImage,
    Confetti,
    CurrentLabelDiv,
    CurrLabelName,
    CurrLabelSign,
    CustomGrid,
    GridContainer,
    GridWrapper,
    ImgLbl,
    Label,
    Overlay,
    PlayerImg,
    PlayerInfoDiv,
    Popup,
    PopupButton,
    PopupHeader,
} from "./GamePvp.Styled.ts";


function GamePvp() {
    const [currentSign, setCurrentSign] = useState(player1.sign);
    const [currentName, setCurrentName] = useState(player1.name);
    const [p1score, setScoreP1] = useState(0);
    const [p2score, setScoreP2] = useState(0);
    const [countTurn, setCountTurn] = useState(0);
    const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
    const [overlayDisplay, setOverlayDisplay] = useState('none');
    const [confettiOpacity, setConfettiOpacity] = useState(0);
    const [winnerText, setWinnerText] = useState("");
    const [showImgArray, setShowImgArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [winnerPopUpDisplay, setWinnerPopUpDisplay] = useState('none');

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

    function handleCellClick(cellId: string) {
        if (board[+cellId] === "") {
            const updatedBoardForPlayer = board.slice();
            updatedBoardForPlayer[+cellId] = currentSign;
            setBoard(updatedBoardForPlayer);

            const updatedBoardForImgs = showImgArray.slice();
            updatedBoardForImgs[+cellId] = 1;
            setShowImgArray(updatedBoardForImgs);

            setCurrentName(currentName === player1.name ? player2.name : player1.name);
            setCurrentSign(currentSign === player1.sign ? player2.sign : player1.sign);

            const winSign = winCondition(updatedBoardForPlayer);

            setCountTurn(countTurn + 1);

            if (winSign) {
                if (winSign === player1.sign) {
                    setScoreP1((prevScore) => prevScore + 1);
                    player1.score = p1score;
                    setCountTurn(0);
                    setCurrentName(player2.name);
                    setCurrentSign(player2.sign);
                    showWinnerPopup(player1.name + " is the winner");
                    setConfettiOpacity(1);
                } else if (winSign === player2.sign) {
                    setScoreP2((prevScore) => prevScore + 1);
                    player2.score = p2score;
                    setCountTurn(0);
                    setCurrentName(player1.name);
                    setCurrentSign(player1.sign);
                    showWinnerPopup(player2.name + " is the winner");
                }
            } else if (countTurn === 8) {
                setCountTurn(0);
                showWinnerPopup("it's a tie");
                setCurrentName(currentName === player1.name ? player2.name : player1.name);
                setCurrentSign(currentSign === player1.sign ? player2.sign : player1.sign);
            }
        }
    }

    function showWinnerPopup(winnerText: string): void {
        setWinnerPopUpDisplay('block');
        setOverlayDisplay('block');
        setConfettiOpacity(1);
        setWinnerText(winnerText);
    }

    function addToLeaderboard() {
        localStorage.setItem(player1.name, String(p1score));
        localStorage.setItem(player2.name, String(p2score));
    }

    function resetBoard() {
        setBoard(['', '', '', '', '', '', '', '', '']);
        setShowImgArray([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setCountTurn(0);
        setWinnerPopUpDisplay('none');
        setOverlayDisplay('none');
        setConfettiOpacity(0);
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

        <CurrentLabelDiv>
            <CurrLabelName>
                <Label id={"currentPlayer"}>current player: {currentName}</Label>
            </CurrLabelName>
            <CurrLabelSign>
                <Label id={"currentSign"}>current sign: <ImgLbl id="imgLbl" src={currentSign} alt=""/></Label>
            </CurrLabelSign>
        </CurrentLabelDiv>

        <Overlay id="overlay"
                 style={{display: overlayDisplay}}>
            <Confetti id="conf"
                      style={{opacity: confettiOpacity}}/>
        </Overlay>

        <Popup style={{display: winnerPopUpDisplay}}>
            <PopupHeader id="winnerText">{winnerText}</PopupHeader>
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

export default GamePvp;
player1;
player2;


//work with figma
//upload images
//maybe with react dropzone