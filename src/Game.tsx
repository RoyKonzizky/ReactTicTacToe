import { Grid } from "@mui/material";
import "./Game.css";

function Game() {
    let currentSign = "";
    let currentName = "";
    currentSign = "x";
    //currentName = p1Name;

    function winCondition(): string {
        const cellValues: string[] = [];
        const cells: HTMLCollectionOf<Element> = document.getElementsByClassName("cell");

        for (let i: number = 1; i == cells.length; i++) {
            cellValues.push((cells[i] as HTMLDivElement).textContent!);
        }

        const winConditions: number[][] = [
            [0, 1, 2], // rows
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // columns
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // diagonals
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


    function handleCellClick(cellId : string) {
        currentSign = "x";
        currentSign = currentSign === "x" ? "o" : "x";
        /*currentName =
            currentName === p1Name ? p2Name : p1Name;*/
        document.getElementById(cellId)!.textContent = currentSign;
        let winSign = winCondition();
        if(winSign){
            //implement win con
        }
    }



    function resetBoard() {
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
        }
    }

    console.log(currentSign);
    console.log(currentName);

    return (
        <div>
            <div className="grid-container">
                <Grid className={"grid"} container spacing={1}>
                    <Grid
                        id={"1"}
                        className={"cell"}
                        onClick={() => handleCellClick("1")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"2"}
                        className={"cell"}
                        onClick={() => handleCellClick("2")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"3"}
                        className={"cell"}
                        onClick={() => handleCellClick("3")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"4"}
                        className={"cell"}
                        onClick={() => handleCellClick("4")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"5"}
                        className={"cell"}
                        onClick={() => handleCellClick("5")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"6"}
                        className={"cell"}
                        onClick={() => handleCellClick("6")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"7"}
                        className={"cell"}
                        onClick={() => handleCellClick("7")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"8"}
                        className={"cell"}
                        onClick={() => handleCellClick("8")}
                        item
                        xs={3}
                    ></Grid>
                    <Grid
                        id={"9"}
                        className={"cell"}
                        onClick={() => handleCellClick("9")}
                        item
                        xs={3}
                    ></Grid>
                </Grid>
            </div>

            <button id={"boardReseter"} onClick={resetBoard}>
                reset grid
            </button>
            <br></br>
            <label className={"label"} id={"currentPlayer"}>
                current player:{" "}
            </label>
            <br></br>
            <label className={"label"} id={"currentSign"}>
                current sign:{" "}
            </label>
            <br></br>
            <label className={"label"} id={"scorePlayer1"}>
                player 1's score:{" "}
            </label>
            <br></br>
            <label className={"label"} id={"scorePlayer2"}>
                player 2's score:{" "}
            </label>
        </div>
    );
}

export default Game;