import { Review, Score, GameData } from '../models';

export class Game
{
    GameId: number;
    GameName: string;
    GameDescription: string;
    Reviews : Review[];
    Scores : Score[];
    Data : GameData[];
    HighScore : number;
}