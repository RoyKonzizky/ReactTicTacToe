import { useState, ChangeEvent } from 'react';
import './App.css';

function PlayersMenu() {
    const [player1Name, setPlayerName1] = useState('');
    const [player2Name, setPlayerName2] = useState('');
    const [player1Sign, setPlayerSign1] = useState('');
    const [player2Sign, setPlayerSign2] = useState('');

    const submitNames = () => {
        const p1Name = player1Name;
        const p2Name = player2Name;
        const p1Sign = player1Sign;
        const p2Sign = player2Sign;

        console.log(`Player 1 Name: ${p1Name}`);
        console.log(`Player 2 Name: ${p2Name}`);
        console.log(`Player 1 Sign: ${p1Sign}`);
        console.log(`Player 2 Sign: ${p2Sign}`);

    };

    const handlePlayerName1 = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerName1(event.target.value);
    };

    const handlePlayerName2 = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerName2(event.target.value);
    };

    const handlePlayerSign1 = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerSign1(event.target.value);
    };

    const handlePlayerSign2 = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerSign2(event.target.value);
    };

    return (
        <>
            <input id="player1Name" value={player1Name} onChange={handlePlayerName1} />
            <input id="player2Name" value={player2Name} onChange={handlePlayerName2} />
            <input id="player1Sign" value={player1Sign} onChange={handlePlayerSign1} />
            <input id="player2Sign" value={player2Sign} onChange={handlePlayerSign2} />
            <button type="button" onClick={submitNames}>
                Submit Player Sign and Name
            </button>
        </>
    );
}


export default PlayersMenu;
