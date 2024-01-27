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

  ngOnInit() {
    let i = 0;
    const id = setInterval(function(){
      const mainLogo = document.querySelector('#main-logo') as HTMLElement;
      const startButton = document.querySelector('#start-button') as HTMLElement;
      mainLogo.style.opacity = (++i / 100).toString();
      mainLogo.style.paddingTop = i.toString() + 'px';
      startButton.style.paddingTop = (100 - i).toString() + 'px'
      
      if (i === 100) {
        clearInterval(id);
      }
    }, 17);
  }

  onSubmit() {
    this.router.navigate(['user-regist']);
  }
}
