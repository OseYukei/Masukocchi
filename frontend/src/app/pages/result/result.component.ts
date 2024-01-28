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

  isWin = false;
  isLose = false;

  constructor(private openAiService: OpenAiService, private router: Router) { }

  ngOnInit() {
    this.answer = sessionStorage.getItem('answer')! + '\n ';

    this.openAiService.getSetting().subscribe((res) => {
      switch (res.character) {
        case '裁判官':
          this.avater = 'assets/character/saibankan.png';

          if (this.answer.indexOf('勝訴') === -1) {
            if (-1 < this.answer.indexOf('敗訴')) {
              this.isLose = true;
            }
          }
          if (this.answer.indexOf('敗訴') === -1) {
            if (-1 < this.answer.indexOf('勝訴')) {
              this.isWin = true;
            }
          }
          if (this.answer.indexOf('勝訴') !== -1 && this.answer.indexOf('敗訴') !== -1) {
            if (this.answer.indexOf('勝訴') < this.answer.indexOf('敗訴')) {
              this.isWin = true;
            } else {
              this.isLose = true;
            }
          }
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

  onClickModal() {
    this.isWin = false;
    this.isLose = false;
  }
}
