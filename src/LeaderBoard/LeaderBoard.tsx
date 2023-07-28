import {CustomLink, CustomTable, CustomTd, CustomTh, DivLink, TableDiv,} from "./LeaderBoard.Styled.ts";
import {Player} from "../PlayableCharacters/Player.ts";

function LeaderBoard() {
    const keys = Object.keys(localStorage);
    const values = keys.map((key) => localStorage.getItem(key));

    const playersData: Player[] = [];

    for (let i = 0; i < keys.length; i++) {
        const player: { score: number; name: string } = {
            name: keys[i],
            score: Number(values[i]),
        };
        playersData.push(player as Player);
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
            <TableDiv>
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
            </TableDiv>

            <DivLink>
                <CustomLink to="/">
                    Back to Main Menu
                </CustomLink>
            </DivLink>
        </div>
    );
}

export default LeaderBoard;