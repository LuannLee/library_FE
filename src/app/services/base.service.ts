import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

constructor(
  public snackBar: MatSnackBar,
  public route : Router,
) { }

public openSnackBar(message:string = '') {
  this.snackBar.open(message, 'Đồng ý', {
    horizontalPosition: "end",
    verticalPosition: "top",
    duration: 1000
  });
}

public goTo = (url: string) => this.route.navigate([`/${url}`]);

}
