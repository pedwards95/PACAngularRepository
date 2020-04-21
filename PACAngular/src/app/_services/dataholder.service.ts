import { Game } from '../models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataHolder
{
    games : Game[];
    gameChoice : string[];
}