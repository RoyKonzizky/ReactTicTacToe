import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {player1, player2} from "../../PlayableCharacters/Player.ts";
import ReactConfetti from "react-confetti";
import {
    Cell,
    CellImage,
    CurrLabelName,
    CurrLabelSign,
    GridContainer,
    GridWrapper,
    ImgLbl,
    Label,
    Overlay,
    Player1Img,
    Player2Img,
    PlayerInfoDiv,
    Popup,
    PopupButton,
    PopupHeader
} from "./Styles.tsx";
import {useState} from "react";

function GamePVP() {
    const [currentSign, setCurrentSign] = useState(player1.sign);
    const [currentName, setCurrentName] = useState(player1.name);
    const [p1score, setScoreP1] = useState(0);
    const [p2score, setScoreP2] = useState(0);
    let countTurn = 0;

    function winCondition(): string {
        const cellValues: string[] = [];
        const cells: HTMLCollectionOf<Element> = document.getElementsByClassName("cell-image");
        for (let i = 0; i < cells.length; i++) {
            cellValues.push((cells[i] as HTMLImageElement).alt);
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

    function handleCellClick(cellId: string) {
        const cell = document.getElementById(cellId) as HTMLElement;
        const currentNameLabel = document.getElementById("currentPlayer") as HTMLElement;
        const imgLbl = document.getElementById("imgLbl") as HTMLImageElement;

        if (cell.textContent === "") {
            const imageForSign = document.getElementById(`image-${cellId}`) as HTMLImageElement;

            if (imageForSign) {
                imageForSign.src = currentSign;
                imageForSign.style.opacity = '1';
                imageForSign.alt = currentSign;
            }

            setCurrentName(currentName === player1.name ? player2.name : player1.name);
            setCurrentSign(currentSign === player1.sign ? player2.sign : player1.sign);

            currentNameLabel.textContent = "current player: " + currentName;
            if (imgLbl) {
                imgLbl.src = currentSign;
                imgLbl.style.opacity = '1';
                imgLbl.alt = currentSign;
            }

            const winSign = winCondition();

            countTurn++;

            if (winSign) {
                if (winSign === player1.sign) {
                    setScoreP1((prevScore) => prevScore + 1);
                    countTurn = 0;
                    setCurrentName(player2.name);
                    setCurrentSign(player2.sign);
                    showWinnerPopup(player1.name + " is the winner");
                } else if (winSign === player2.sign) {
                    setScoreP2((prevScore) => prevScore + 1);
                    countTurn = 0;
                    setCurrentName(player1.name);
                    setCurrentSign(player1.sign);
                    showWinnerPopup(player2.name + " is the winner");
                }
            } else if (countTurn === 9) {
                countTurn = 0;
                showWinnerPopup("it's a tie");
                setCurrentName(currentName === player1.name ? player2.name : player1.name);
                setCurrentSign(currentSign === player1.sign ? player2.sign : player1.sign);
            }
        }

        cell.style.pointerEvents = 'none';
    }

    function createGrid() {
        const cellIds: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

        return (
            <div className="grid-container">
                <GridContainer>
                    <GridWrapper>
                        <Grid sx={{width: "82%", marginLeft: "0", marginTop: "0"}} container spacing={2}>
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
                        </Grid>
                    </GridWrapper>
                </GridContainer>
            </div>
        );
    }

    function showWinnerPopup(winnerText: string): void {
        const winnerPopup = document.getElementById("winnerPopup") as HTMLElement;
        const overlay = document.getElementById("overlay") as HTMLElement;
        const winnerTextElement = document.getElementById("winnerText") as HTMLElement;
        const confetti = document.getElementById("conf") as HTMLElement;
        winnerTextElement.textContent = winnerText;
        winnerPopup.style.display = "block";
        overlay.style.display = "block";
        confetti.style.opacity = '1';
    }

    function resetBoard() {
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) { //change to for each
            const cell = cells[i] as HTMLElement;
            cell.style.pointerEvents = 'auto';
            const img = document.getElementById(`image-${i}`) as HTMLImageElement;
            img.src = "";
            img.alt = "";
            img.style.opacity = '0';
        }
        const winnerPopup = document.getElementById("winnerPopup") as HTMLElement;
        winnerPopup.style.display = "none";

        const overlay = document.getElementById("overlay") as HTMLElement;
        overlay.style.display = "none";

        const confetti = document.getElementById("conf") as HTMLElement;
        confetti.style.opacity = '0';

        const player1Img = document.getElementById("player1Img") as HTMLImageElement;
        player1Img.src = player1.sign;
        const player2Img = document.getElementById("player2Img") as HTMLImageElement;
        player2Img.src = player2.sign;
    }

    return (
        <div>
            <PlayerInfoDiv>
                <Label id="player1Label">
                    <Player1Img id="player1Img" src={player1.sign} alt="X"/>: {player1.name} - {p1score}
                </Label>
                <Label id="player2Label">
                    <Player2Img id="player2Img" src={player2.sign} alt="O"/>: {player2.name} - {p2score}
                </Label>
            </PlayerInfoDiv>

            <div className="grid-container">{createGrid()}</div>

            <CurrLabelName>
                <Label id={"currentPlayer"}>current player: {currentName}</Label>
            </CurrLabelName>
            <CurrLabelSign>
                <Label id={"currentSign"}>
                    current sign: <ImgLbl id="imgLbl" src={currentSign} alt=""/>
                </Label>
            </CurrLabelSign>

            <Overlay id="overlay">
                <ReactConfetti id="conf"/>
            </Overlay>

            <Popup id="winnerPopup">
                <PopupHeader id="winnerText"/>
                <Link to="/">
                    <PopupButton id={"retMenuButton"}>back to menu</PopupButton>
                </Link>
                <PopupButton id={"boardReseter"} onClick={resetBoard}>
                    reset grid
                </PopupButton>
            </Popup>
        </div>
    );
}

export default GamePVP;


//work with figma
//fixed the image issue with opacity style attribute but need to find a better way, ask roy about it
// instead document import the component with function components
//TODO fix the grid location