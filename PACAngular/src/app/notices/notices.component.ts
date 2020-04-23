import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { PACGamesService } from '../_services';
import { Notice } from '../models';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit
{
  notices: Notice[];
  messageForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private PACGamesService: PACGamesService,
  ) {}

  ngOnInit(): void
  {
    this.messageForm = this.formBuilder.group(
      {
      Description: ['', Validators.required],
      Time: ['', Validators.required]
      });
    this.getNotices();
  }


  getNotices()
  {
    this.PACGamesService.getNotices()
      .subscribe(notices => {
        if(notices.length > 5)
        {
          this.notices = notices.slice(Math.max(notices.length - 5, 0));
        }
        else
        {
          this.notices = notices;
        }
      })
  }

  save()
  {
    var myMessage : Notice = new Notice
    {
      myMessage.Description = this.messageForm.controls['Description'].value;
      myMessage.Time = new Date;
    }
    this.PACGamesService.addNotice(myMessage)
      .subscribe(notice => {
        notice.Description = myMessage.Description,
        notice.Time = new Date(),
        this.notices.push(notice),
        this.checkNoticeLength()
      })
  }

  checkNoticeLength()
  {
    if(this.notices.length > 5)
    {
      this.notices = this.notices.slice(Math.max(this.notices.length - 5, 0));
    }
  }

}
