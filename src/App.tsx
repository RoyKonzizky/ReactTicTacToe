import './App.css';
import { Link } from "react-router-dom";

interface Player {
    name: string;
    sign: string;
    score: number;
}
export const player1: Player = {
    name: '',
    sign: '',
    score: 0
};

export const player2: Player = {
    name: '',
    sign: '',
    score: 0
};

function App() {
    function submitNames() {
        player1.name = (document.getElementById("player1Name") as HTMLInputElement).value;
        player2.name = (document.getElementById("player2Name") as HTMLInputElement).value;
        player1.sign = (document.getElementById("player1Sign") as HTMLInputElement).value;
        player2.sign = (document.getElementById("player2Sign") as HTMLInputElement).value;
    }

    return (
        <>
            <input id="player1Name" />
            <input id="player2Name" />
            <input id="player1Sign" />
            <input id="player2Sign" />

            <Link to="/game">
                <button className="buttonLink" type="button" onClick={submitNames}>
                    Submit Player Sign and Name
                </button>
            </Link>
        </>
    );
}

export default App;player1;player2;
