import {Grid} from "@mui/material";
import {useState} from "react";
import {Link} from "react-router-dom";
import ReactConfetti from "react-confetti";
import {player1, player2} from "../../PlayableCharacters/Player.ts";
import {
    Cell,
    CellImage,
    CurrentLabelDiv,
    CurrLabelName,
    CurrLabelSign,
    GridContainer,
    GridWrapper,
    ImgLbl,
    Label,
    Overlay,
    PlayerImg,
    PlayerInfoDiv,
    Popup,
    PopupButton,
    PopupHeader
} from "./GamePvp.Styles.ts";


function GamePvp() {
    const [currentSign, setCurrentSign] = useState(player1.sign);
    const [currentName, setCurrentName] = useState(player1.name);
    const [p1score, setScoreP1] = useState(0);
    const [p2score, setScoreP2] = useState(0);
    const [count, setCount] = useState(0);

    function winCondition(): string {
        const cellValues: string[] = [];
        const cells: HTMLCollectionOf<Element> = document.getElementsByClassName("cell-image");
        Array.from(cells).forEach((cell) => {
            cellValues.push((cell as HTMLImageElement).alt);
        });

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
        const confetti = document.getElementById("conf") as HTMLElement;
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

            setCount(count + 1);

            if (winSign) {
                if (winSign === player1.sign) {
                    setScoreP1((prevScore) => prevScore + 1);
                    player1.score = p1score;
                    setCount(0);
                    setCurrentName(player2.name);
                    setCurrentSign(player2.sign);
                    showWinnerPopup(player1.name + " is the winner");
                    confetti.style.opacity = '1';
                } else if (winSign === player2.sign) {
                    setScoreP2((prevScore) => prevScore + 1);
                    player2.score = p2score;
                    setCount(0);
                    setCurrentName(player1.name);
                    setCurrentSign(player1.sign);
                    showWinnerPopup(player2.name + " is the winner");
                    confetti.style.opacity = '1';
                }
            } else if (count === 8) {
                setCount(0);
                showWinnerPopup("it's a tie");
                setCurrentName(currentName === player1.name ? player2.name : player1.name);
                setCurrentSign(currentSign === player1.sign ? player2.sign : player1.sign);
                confetti.style.opacity = '0';
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
        winnerTextElement.textContent = winnerText;
        winnerPopup.style.display = "block";
        overlay.style.display = "block";
    }

    function resetBoard() {
        const cells = document.getElementsByClassName("cell");
        const winnerPopup = document.getElementById("winnerPopup") as HTMLElement;
        const overlay = document.getElementById("overlay") as HTMLElement;
        const confetti = document.getElementById("conf") as HTMLElement;
        const player1Img = document.getElementById("player1Img") as HTMLImageElement;
        const player2Img = document.getElementById("player2Img") as HTMLImageElement;
        Array.from(cells).forEach((cell) => {
            const cellElement = cell as HTMLElement;
            cellElement.style.pointerEvents = "auto";
            const img = document.getElementById(`image-${cellElement.id}`) as HTMLImageElement;
            img.src = "";
            img.alt = "";
            img.style.opacity = "0";
        });

        winnerPopup.style.display = "none";
        overlay.style.display = "none";
        confetti.style.opacity = '0';
        player1Img.src = player1.sign;
        player2Img.src = player2.sign;

        localStorage.setItem(player1.name, String(p1score));
        localStorage.setItem(player2.name, String(p2score));
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

export default GamePvp;
player1;
player2;


//work with figma
// remove conf if tie
// improve gird appearance
