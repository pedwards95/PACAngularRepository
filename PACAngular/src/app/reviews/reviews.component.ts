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
  review : Review;

  constructor(private PACGamesService: PACGamesService,private authenticationService: AuthenticationService) { this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit(): void {
  }

  add(reviewRating: number, reviewBody: string): void {
    reviewBody = reviewBody.trim();
    reviewRating = +reviewRating;
    if (!reviewRating) { return; }
    // let review = new Review
    // {
    //   review.reviewId = 0,
    //   review.userId = this.currentUser.userId,
    //   review.username = this.currentUser.username,
    //   review.gameId = this.game.GameId,
    //   review.gameName = this.game.GameName,
    //   review.rating = reviewRating,
    //   review.reviewBody = reviewBody
    // }
    console.log (typeof(reviewRating));
    this.PACGamesService.addReview(this.currentUser.userId, this.currentUser.username, this.game.GameId, this.game.GameName, reviewRating, reviewBody)
      .subscribe(review => {
        this.game.Reviews.push(review);
      });
  }

  delete(review: Review): void {
    this.game.Reviews = this.game.Reviews.filter(r => r !== review);
    this.PACGamesService.deleteReview(review).subscribe();
  }
}
