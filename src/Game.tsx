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
        </div>
    );
}


export default Game;
