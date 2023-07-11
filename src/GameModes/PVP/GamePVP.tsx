import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./GamePVP.css";
import { Player, player1, player2 } from "../../PlayableCharacters/Player.ts";
import xImage from "../../assets/x.svg.png";
import oImage from "../../assets/o.png";

function GamePVP() {
  let currentSign = player1.sign;
  let currentName = player1.name;
  let countTurn = 0;

  function winCondition(): string {
    const cellValues: string[] = [];
    const cells: HTMLCollectionOf<Element> =
        document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
      cellValues.push((cells[i] as HTMLDivElement).getAttribute("alt"));
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
          cellValues[a] !== null &&
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
    const currentNameLabel = document.getElementById(
        "currentPlayer",
    ) as HTMLElement;
    const currentSignLabel = document.getElementById(
        "currentSign",
    ) as HTMLElement;
    if (cell.getAttribute("alt") === null) {
      let winnerText;
      const tieText = "It's a tie";
      const imageSrc = currentSign === player1.sign ? xImage : oImage;
      cell.innerHTML = `<img class="cellImages" src="${imageSrc}" alt="${currentSign}" />`;
      currentSign = currentSign === player1.sign ? player2.sign : player1.sign;
      currentName = currentName === player1.name ? player2.name : player1.name;
      currentNameLabel.textContent = "Current player: " + currentName;
      currentSignLabel.textContent = "Current sign: " + currentSign;
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
        currentName =
            currentName === player1.name ? player2.name : player1.name;
      }
    }
  }

  function resetBoard() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
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
          <label className={"label"} id={"currentPlayer"}>
            Current player: {currentName}
          </label>
        </div>

        <div>
          <label className={"label"} id={"currentSign"}>
            Current sign: {currentSign}
          </label>
        </div>

        <div>
          <label className={"label"} id={"scorePlayer1"}>
            {player1.name}'s score: {player1.score}
          </label>
        </div>

        <div>
          <label className={"label"} id={"scorePlayer2"}>
            {player2.name}'s score: {player2.score}
          </label>
        </div>

        <div id="overlay" className="overlay"></div>

        <div id="winnerPopup" className="popup">
          <h2 id="winnerText"></h2>
          <Link to="/">
            <button type="button" id={"retMenuButton"}>
              Back to menu
            </button>
          </Link>
          <button id={"boardReseter"} onClick={resetBoard}>
            Reset grid
          </button>
        </div>
      </div>
  );
}

export default GamePVP;
