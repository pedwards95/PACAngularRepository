import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import { HangmanService } from '../hangman.service';
import { GameData } from '../models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {

  gamedata: GameData[];

  error: string | undefined;

  constructor(
    private gameHubApi: HangmanService
  ) { }

  ngOnInit(): void {
    this.getQA()
  }

  //set variable outside funct for persistence
  rand: number = 0;
  //get random number w/in range to be called when refreshing question
  getRand(): void{
    let max = this.gamedata.length - 1;
    let min = 0;
    //forumula for random number within range
    this.rand = Math.floor(Math.random() * (max-min+1)) + min;
  }

  //get question and answer as a row from gamedata randomly
  getQA(){
    this.gameHubApi.getQA()
      .subscribe(answer => this.gamedata[this.rand].Answer = answer[this.rand].Answer,
                  question => this.gamedata[this.rand].Question = question[this.rand].Question);
  }

  //compare user input answer to answer matching drawn question
  checkMatch(){
    //get answer from user input in html
    var userAnswer = document.getElementById('answer').innerHTML;
    //compare user input to answer of question randomly
    if(userAnswer == this.gamedata[this.rand].Answer){
      return true;
    }
    else{
      return false;
    }
  }

  //set html of result element depending on result of checkmatch function when html button is pushed
  showResult(){
    if (!this.checkMatch){
      document.getElementById('result').innerHTML = "Wrong, add to hangman.";
    }
    else{
      document.getElementById('result').innerHTML = "Correct!";
    }
  }
}
