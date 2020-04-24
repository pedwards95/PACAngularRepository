import { Component, OnInit, Input } from '@angular/core';
import { PACGamesService, AuthenticationService } from '../_services';
import { Review } from '../models'
import { first } from 'rxjs/operators';

import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../models';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit
{
  @Input() review: Review;
  invaliduser : number;
  currentUser : any;
  activateMessage : string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private PACGamesService: PACGamesService,
    private location: Location,
    private authenticationService: AuthenticationService
  ) { this.currentUser = this.authenticationService.CurrentUserValue; }

  ngOnInit(): void
  {
    this.getReview();
  }

  getReview(): void
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.PACGamesService.getReviews()
      this.PACGamesService.getReview(id)
        .subscribe(review => {
          this.checkNull(review),
          this.review = review,
          this.invaliduser= this.getNumber()
      });
  }

  save(): void {
    if (this.currentUser.username != this.review.Username)
    {
      return;
    }
    this.PACGamesService.updateReview(this.review)
      .subscribe(() => this.activateMessage="Review Updated!")
  }

  goBack(): void
  {
    this.location.back();
  }

  getNumber() : number
  {
    if (this.currentUser.username != this.review.Username)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }

  checkNull(x:Review)
  {
    if(x==undefined)
    {
      this.router.navigateByUrl('/link');
    }
  }
}
