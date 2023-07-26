import React from "react";
import {CustomTable, CustomTd, CustomTh, HeadDiv} from "./LeaderBoard.Styled.ts";
import {Player} from "../PlayableCharacters/Player.ts";

function LeaderBoard() {
    // Retrieve keys and values from localStorage
    const keys = Object.keys(localStorage);
    const values = keys.map((key) => localStorage.getItem(key));

    const playersData: Player[] = [];

    // Create Player objects from localStorage data and add them to playersData array
    for (let i = 0; i < keys.length; i++) {
        const player: Player = {
            name: keys[i],
            score: Number(values[i]), // Assuming the score is stored as a number in localStorage
        };
        playersData.push(player);
    }

    function createBoard() {
        if (playersData.length > 0) {
            return (
                playersData.map((player: Player, index) => (
                    <tr key={index}>
                        <CustomTd>{player.name}</CustomTd>
                        <CustomTd>{player.score}</CustomTd>
                    </tr>
                ))
            );
        } else {
            return null; // If no player data available, return null or display a message
        }
    }

    return (
        <div>
            <HeadDiv>
                <CustomTable>
                    <thead>
                    <tr>
                        <CustomTh>Player Name</CustomTh>
                        <CustomTh>Player Score</CustomTh>
                    </tr>
                    </thead>
                    <tbody>
                    {createBoard()}
                    </tbody>
                </CustomTable>
            </HeadDiv>
        </div>
    );
}

export default LeaderBoard;
