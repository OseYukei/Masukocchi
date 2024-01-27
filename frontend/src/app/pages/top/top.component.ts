import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent {

  constructor(
    private router: Router
  ) {
  }
  onSubmit() {
    this.router.navigate(['user-regist']);
  }
}
