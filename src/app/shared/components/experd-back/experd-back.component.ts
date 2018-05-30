import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-experd-back',
  templateUrl: './experd-back.component.html',
  styleUrls: ['./experd-back.component.scss']
})
export class ExperdBackComponent implements OnInit {

  constructor(
    public _location: Location
  ) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
