import { Component, OnInit,Input } from '@angular/core';
import { PACGamesService, AuthenticationService } from '../_services';
import { User } from '../models';

import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit
{
  @Input() user: User;
  currentUser : any;
  invaliduser : number;

  constructor
  (
    private router: Router,
    private route: ActivatedRoute,
    private PACGamesService: PACGamesService,
    private location: Location,
    private authenticationService: AuthenticationService
  ) {this.currentUser = this.authenticationService.CurrentUserValue;}

  ngOnInit(): void
  {
    this.getUser();
  }

  getUser(): void
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.PACGamesService.getUser(id)
      .subscribe(user => {
        this.checkNull(user),
        this.user = user,
        this.invaliduser= this.getNumber()
    });
  }

  save(): void {
    if (this.currentUser.username != this.user.Username)
    {
      return;
    }
    this.PACGamesService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  goBack(): void
  {
    this.location.back();
  }

  getNumber() : number
  {
    if (this.currentUser.username != this.user.Username)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }

  checkNull(x:User)
  {
    if(x==undefined)
    {
      this.router.navigateByUrl('/link');
    }
  }
}
