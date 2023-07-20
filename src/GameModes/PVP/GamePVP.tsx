import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
//import "./GamePVP.css";
import {player1, player2} from "../../PlayableCharacters/Player.ts";
import ReactConfetti from "react-confetti";
import {
    Cell,
    CellImage,
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

function GamePVP() {
    let currentSign = player1.sign;
    let currentName = player1.name;
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
            let winnerText;
            const tieText = "it's a tie";

            const imageForSign = document.getElementById(`image-${cellId}`) as HTMLImageElement;

            if (imageForSign) {
                imageForSign.src = currentSign;
                imageForSign.style.opacity = '1';
                imageForSign.alt = currentSign;
            }

            currentSign = currentSign === player1.sign ? player2.sign : player1.sign;
            currentName = currentName === player1.name ? player2.name : player1.name;

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
                <GridContainer>
                    <GridWrapper>
                        <Grid className={"grid"} container spacing={1}>
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
        for (let i = 0; i < cells.length; i++) {
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
        const player1Label = document.getElementById("player1Label") as HTMLElement;
        const player2Label = document.getElementById("player2Label") as HTMLElement;
        player1Label.innerHTML = <Player1Img src={player1.sign} alt="X"/> + player1.name + ": " + " - " + player1.score;
        player2Label.innerHTML = <Player2Img src={player2.sign} alt="O"/> + player2.name + ": " + " - " + player2.score;
    }

    return (
        <div>

            <PlayerInfoDiv>
                <Label id="player1Label">
                    <Player1Img id="player1Img" src={player1.sign} alt="X"/>: {player1.name} - {`${player1.score}`}
                </Label>
                <Label id="player2Label">
                    <Player2Img id="player2Img" src={player2.sign} alt="O"/>: {player2.name} - {`${player2.score}`}
                </Label>
            </PlayerInfoDiv>

            <div className="grid-container">{createGrid()}</div>

            <div>
                <Label id={"currentPlayer"}>current player: {currentName}</Label>
            </div>

            <div>
                <Label id={"currentSign"}>
                    current sign: <ImgLbl id="imgLbl" src={currentSign} alt=""/>
                </Label>
            </div>

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
//TODO fix the score labels