import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenAiService } from '../../service/open-ai.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent {

  fadeInId: number = 0;

  constructor(
    private router: Router,
    private openAiService: OpenAiService,
  ) {
    this.openAiService.reset().subscribe();
  }

  ngOnInit() {
    let i = 0;
    const MAX = 100;
    
    const mainLogo = document.querySelector('#main-logo') as HTMLElement;
    const startButton = document.querySelector('#start-button') as HTMLElement;
    this.fadeInId = window.setInterval(() => {
      i++;
      mainLogo.style.opacity = (i / MAX).toString();
      mainLogo.style.paddingTop = i.toString() + 'px';
      startButton.style.opacity = (i / MAX).toString();
      startButton.style.paddingTop = (MAX - i).toString() + 'px'
      
      if (i === MAX) {
        clearInterval(this.fadeInId);
      }
    }, 13);
  }

  onSubmit() {
    clearInterval(this.fadeInId);

    let i = 0;
    const MAX = 100;
    
    const mainLogo = document.querySelector('#main-logo') as HTMLElement;
    const startButton = document.querySelector('#start-button') as HTMLElement;
    this.fadeInId = window.setInterval(() => {
      i++;
      mainLogo.style.opacity = ((MAX - i) / MAX).toString();
      startButton.style.opacity = ((MAX - i) / MAX).toString();
      
      if (i === MAX) {
        clearInterval(this.fadeInId);
        this.router.navigate(['user-regist']);
      }
    }, 1);
  }
}
