import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseService implements OnInit {

  public panelOpenState = false;

  constructor(
    public snackBar: MatSnackBar,
    public route : Router,
  ) {
    super(snackBar,route)
  }

  ngOnInit() {
  }

}
