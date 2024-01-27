import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent {

  fadeInId: number = 0;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    let i = 0;
    const MAX = 100;
    this.fadeInId = window.setInterval(() => {
      const mainLogo = document.querySelector('#main-logo') as HTMLElement;
      const startButton = document.querySelector('#start-button') as HTMLElement;
      mainLogo.style.opacity = (++i / MAX).toString();
      mainLogo.style.paddingTop = i.toString() + 'px';
      startButton.style.paddingTop = (MAX - i).toString() + 'px'
      
      if (i === MAX) {
        clearInterval(this.fadeInId);
      }
    }, 12);
  }

  onSubmit() {
    this.router.navigate(['user-regist']);
    clearInterval(this.fadeInId);
  }
}
