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
        notice.Time = new Date().toLocaleString() as any,
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

  //date formatter from stack overflow, solver JSON formatter difference with typescript (An Nguyen)
  _formatDatetime(date: Date, format: string)
  {
    const _padStart = (value: number): string => value.toString().padStart(2, '0');
    return format
      .replace(/yyyy/g, _padStart(date.getFullYear()))
      .replace(/dd/g, _padStart(date.getDate()))
      .replace(/mm/g, _padStart(date.getMonth() + 1))
      .replace(/hh/g, _padStart(date.getHours()))
      .replace(/ii/g, _padStart(date.getMinutes()))
      .replace(/ss/g, _padStart(date.getSeconds()));
  }
  isValidDate(d: Date): boolean
  {
      return !isNaN(d.getTime());
  }
  formatDate(date: any): string {
      var datetime = new Date(date);
      return this.isValidDate(datetime) ? this._formatDatetime(datetime, 'yyyy-mm-dd hh:ii:ss') : '';
  }

}
