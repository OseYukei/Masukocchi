import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenAiService } from '../../service/open-ai.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  answer = '';

  avater = '';

  constructor(private openAiService: OpenAiService, private router: Router) {}

  ngOnInit() {
    this.answer = sessionStorage.getItem('answer') || '';

    this.openAiService.getSetting().subscribe((res) => {
      switch (res.character) {
        case '裁判官':
          this.avater = 'assets/character/saibankan.png';
          break;
        case 'オネエ':
          this.avater = 'assets/character/okama.png';
          break;
        case '全肯定マン':
          this.avater = 'assets/character/kanzenkoutei.png';
          break;
        case '全否定マン':
          this.avater = 'assets/character/kanzenhitei.png';
          break;
      }
    });
  }

  onClickButton() {
    this.router.navigate(['top']);
  }
}
