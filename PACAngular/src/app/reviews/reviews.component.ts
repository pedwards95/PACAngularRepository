import { Component, OnInit, Input } from '@angular/core';
import { PACGamesService,AuthenticationService} from '../_services';
import { Game,Review,User } from '../models'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() game: Game;
  currentUser : User;

  constructor(private PACGamesService: PACGamesService,private authenticationService: AuthenticationService) { this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit(): void {
  }

  add(reviewRating: number, reviewBody: string): void {
    reviewBody = reviewBody.trim();
    if (!reviewBody) { return; }
    this.PACGamesService.addReview(this.currentUser.userId,this.currentUser.username,this.game.GameId,this.game.GameName,reviewRating,reviewBody)
      .subscribe(review => {
        this.game.Reviews.push(review);
      });
  }

  delete(review: Review): void {
    this.game.Reviews = this.game.Reviews.filter(h => h !== review);
    this.PACGamesService.deleteReview(review).subscribe();
  }

}
