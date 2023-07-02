import { Grid } from "@mui/material";
import './Game.css';


function Game() {
    let currentSign = "";
    const currentName = "";
    function handleCellClick(){
        currentSign = "x";
        currentSign =
            currentSign === "x" ? "o" : "x";
        /*currentName =
            currentName === "" ? "" : "";*/
    }
    function resetBoard(){
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = "";
        }
    }
    console.log(currentSign);
    console.log(currentName);

    return (
        <div>
            <Grid className={"grid"} container spacing={1}>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
                <Grid className={"cell"} onClick={handleCellClick} item xs={3}>
                </Grid>
            </Grid>
            <button id={"boardReseter"} onClick={resetBoard}>reset grid</button>
        </div>
    );
}


export default Game;
