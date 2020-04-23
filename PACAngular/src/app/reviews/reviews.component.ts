import { Component, OnInit, Input } from '@angular/core';
import { PACGamesService,AuthenticationService} from '../_services';
import { Game,Review,User } from '../models'
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() game: Game;
  currentUser : User;
  review : Review;
  myReviews : Review[];
  createdMessage : string;
  highest: number;

  constructor(private PACGamesService: PACGamesService,private authenticationService: AuthenticationService) { this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit(): void {
    this.getHighestReviewId();
  }

  add(reviewRating: number, reviewBody: string): void {
    reviewBody = reviewBody.trim();
    reviewRating = +reviewRating;
    if (!reviewRating) { return; }
    let review = new Review
    {
      review.ReviewId = 0,
      review.UserId = this.currentUser.userId,
      review.Username = this.currentUser.username,
      review.GameId = this.game.GameId,
      review.GameName = this.game.GameName,
      review.Rating = reviewRating,
      review.ReviewBody = reviewBody
    }
    this.PACGamesService.addReview(review)
      .subscribe(review => {
        review.ReviewId=this.highest+1,
        review.Rating=reviewRating,
        review.Username=this.currentUser.username,
        this.game.Reviews.push(review)
      });

    this.createdMessage = "Your review has been created!";

  }

  delete(review: Review): void {
    this.game.Reviews = this.game.Reviews.filter(r => r !== review);
    this.PACGamesService.deleteReview(review).subscribe();
  }

  getHighestReviewId()
  {
    this.PACGamesService.getReviews()
      .subscribe(reviews => {
        this.myReviews = reviews,
        this.highest = this.myReviews[this.myReviews.length-1].ReviewId;
      });
  }
}
