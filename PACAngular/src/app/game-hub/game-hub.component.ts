import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-game-hub',
  templateUrl: './game-hub.component.html',
  styleUrls: ['./game-hub.component.css']
})
export class GameHubComponent implements OnInit
{
  currentUser : User;
  constructor(
    private authenticationService: AuthenticationService
  ){this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit(): void
  {
  }
}
