import "./LeaderBoard.Styled.ts";
import {CustomTable, CustomTd, CustomTh, HeadDiv} from "./LeaderBoard.Styled.ts";
import {Player} from "../PlayableCharacters/Player.ts";

function LeaderBoard() {
    // eslint-disable-next-line prefer-const
    let values = [],
        // eslint-disable-next-line prefer-const
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }

    const playersData: Player[] = [];

    for (i = 0; i < values.length; i++) {
        const player: Player = ["", "", 0];
        playersData[i] = [(player.name = localStorage.key(i)), values[i]];
    }

    function createBoard() {
        if (playersData) {
            return (
                playersData.map((player: Player, index) => (
                    <tr key={index}>
                        <CustomTd>{player.name}</CustomTd>
                        <CustomTd>{player.score}</CustomTd>
                    </tr>
                ))
            );
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
