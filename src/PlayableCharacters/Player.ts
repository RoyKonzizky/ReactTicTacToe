import X from '../assets/X.svg.png'
import O from '../assets/o.png'
export interface Player {
    name: string;
    sign: string;
    score: number;
}

export const player1: Player = {
    name: '',
    sign: X,
    score: 0
};
export const player2: Player = {
    name: '',
    sign: O,
    score: 0
};