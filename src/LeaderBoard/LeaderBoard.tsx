import React from "react";
import {CustomTable, CustomTd, CustomTh, HeadDiv} from "./LeaderBoard.Styled.ts";
import {Player} from "../PlayableCharacters/Player.ts";
import {PopupButton} from "../GameModes/PVP/GamePvp.Styles.ts";

function LeaderBoard() {
    const keys = Object.keys(localStorage);
    const values = keys.map((key) => localStorage.getItem(key));

    const playersData: Player[] = [];

    for (let i = 0; i < keys.length; i++) {
        const player: Player = {
            name: keys[i],
            score: Number(values[i]),
        };
        playersData.push(player);
    }

    playersData.sort((a, b) => b.score - a.score);

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
            return null;
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
//add back button