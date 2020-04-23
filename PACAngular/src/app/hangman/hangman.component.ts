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
      .subscribe(gamedata => this.gamedata = gamedata);
  }

  //function to validate user input
  validate(){
    //validation checks that userinput is a string with only letters and at least one character
    var reg =/^[0-9\!\@\#\$\%\^\*\_\|\<\>\{\}]+/;
    var guess = (document.getElementById('answer') as HTMLInputElement).value;
    //if input contains invalid num/symbol, will not run hangman
    if(reg.test(guess)){              
      document.getElementById('result').innerHTML = "No numbers or symbols, please.";
    }
    else{
      //calls showresult only upon valid input
      this.showResult();
    }
  }

  //create counting integer for replacing images and ending game
  hangCount = 0;
  //get caption element to change
  caption = document.getElementById('hangmancaption');

  //set html of result element depending on result of checkmatch function when html button is pushed
  showResult(){
    //call validate function to ensure proper user input
    // this.validate();
    //get answer from user input in html
    //setting it specifically as htmlinputelement and grabbing value instead of innerhtml fixed the issue
    var userAnswer = (document.getElementById('answer') as HTMLInputElement).value;
    //compare user input answer to answer matching drawn question
    if(userAnswer == this.gamedata[this.rand].Answer){
      document.getElementById('result').innerHTML = "Correct, you win!";
      // disable buttons upon win
      this.disableButtons();
    }
    else{
      //add to count when user is wrong
      this.hangCount++;
      console.log(this.hangCount);
      document.getElementById('result').innerHTML = "Wrong, add to hangman.";

      //get img to swap hangman pics & caption upon count (after getting img as htmlimageelement)
      (document.getElementById('hangmanpic') as HTMLImageElement).src = "../../assets/hangmanpics/hangman"+this.hangCount+".png";
      
      var caption = document.getElementById('hangmancaption');
      //iterate through hangman caption cases
      switch(this.hangCount){
        case 0:
          caption.innerHTML = "Let's begin.";
          break;
        case 1:
          caption.innerHTML = "Heads up.";
          break;
        case 2:
          caption.innerHTML = "I've got your back.";
          break;
        case 3:
          caption.innerHTML = "Break a leg.";
          break;
        case 4:
          caption.innerHTML = "Now I'm getting nervous.";
          break;
        case 5:
          caption.innerHTML = "Last chance.";
          break;
        case 6:
          caption.innerHTML = "Game over.";
          break;
      }

      //if user has gone through all six attempts, then disable buttons
      if(this.hangCount == 6){
        this.disableButtons();
      }
    }
  }

  //new game function (need to add button)
  //should re-enable check and new question buttons, and set count back to 0, and blank out result field
  //get new random number for question, empty input field
  newGame(){
    this.hangCount = 0;
    this.getRand();
    (document.getElementById('hangmanpic') as HTMLImageElement).src = "../../assets/hangmanpics/hangman"+this.hangCount+".png";
    document.getElementById('hangmancaption').innerHTML = "Let's begin.";
    (document.getElementById('answer') as HTMLInputElement).value = "";
    document.getElementById('result').innerHTML = "";
    (document.getElementById('answer') as HTMLInputElement).disabled = false;
    (document.getElementById("resultbutton") as HTMLButtonElement).disabled = false;
    (document.getElementById("newqbutton") as HTMLButtonElement).disabled = false;
  }

  //function called to disable result and question buttons
  disableButtons(){
    (document.getElementById("resultbutton") as HTMLButtonElement).disabled = true;
    (document.getElementById("newqbutton") as HTMLButtonElement).disabled = true;
    (document.getElementById('answer') as HTMLInputElement).disabled = true;
  }
}