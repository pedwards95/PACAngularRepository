import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { PACGamesService} from '../_services';
import { first } from 'rxjs/operators';
import { Game } from '../models';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.css']
})
export class GamesOverviewComponent implements OnInit
{
  gameChoice : string[];
  games: Game[];
  selectedGame : Game;
  error: string | undefined;
  highScore : number = 0;
  constructor(
    private PACGamesService: PACGamesService,
  )
  {
    this.games = [];
    this.getAll()
    this.gameChoice = [];
    this.getChoices(this.games)
  }

  ngOnInit(): void
  {
    this.getAll()
  }

  getAll()
  {
    this.PACGamesService.getGames()
      //.pipe(first())
      .subscribe(games =>
        {
          this.games = games;
          this.getChoices(games);
          // for(let i:number = 0; i<this.games.length;i++)
          // {
          //   this.gameChoice.push(this.games[i].GameName);
          // }
        });
  }

  getChoices(game: Game[])
  {
    for(let i:number = 0; i<this.games.length;i++)
    {
      this.gameChoice.push(game[i].GameName);
    }
  }

  onSelect(selectedGame: Game): void {
    this.selectedGame = selectedGame;
  }

  handleError(error: HttpErrorResponse)
  {
    if (error.error instanceof ErrorEvent)
    {
      this.error = `An error occurred: ${error.error.message}`;
    }
    else
    {
      this.error = `Backend returned code ${error.status}, body was: ${error.error}`
    }
  }

  resetError()
  {
    this.error = undefined;
  }

}
