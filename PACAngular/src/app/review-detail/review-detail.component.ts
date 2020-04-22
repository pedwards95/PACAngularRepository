import { Component, OnInit, Input } from '@angular/core';
import { PACGamesService,DataHolder} from '../_services';
import { Game, Review } from '../models'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit
{
  @Input() game: Game;

  constructor() { }

  ngOnInit(): void
  {
  }
}
