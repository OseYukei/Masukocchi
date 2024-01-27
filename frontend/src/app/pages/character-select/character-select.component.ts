import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenAiService } from '../../service/open-ai.service';
import { Character } from '../../../../../common/types/setting';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrl: './character-select.component.scss',
})
export class CharacterSelectComponent {
  /** キャラクター一覧 */
  characters: { id: number; name: Character; img: string; description: string }[] = [
    {
      id: 1,
      name: '裁判官',
      img: 'assets/character/saibankan.png',
      description:
        '説明文ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ（全角１４０文字）',
    },
    {
      id: 2,
      name: 'オネエ',
      img: 'assets/character/okama.png',
      description: '説明文',
    },
    {
      id: 3,
      name: '全肯定マン',
      img: 'assets/character/kanzenkoutei.png',
      description:
        'どーも、こんにちは！世の中のすべてをポジティブに受け入れちゃう、全肯定マンだよ！みんなの意見も、感情も、何でもかんでも大歓迎！さぁ、ポジティブなエネルギーを全開で受け取って、みんなでハッピーな時間を過ごそうぜ！',
    },
    {
      id: 4,
      name: '全否定マン',
      img: 'assets/character/kanzenhitei.png',
      description:
        'よく来たな、愚かなる者ども...。俺は全否定マン...。世の中のあらゆる意見を跳ね除け、暗黒の中で支配を狙う者だ...。ポジティブな未来など存在しない...。この世界は絶望と否定に満ちている...。',
    },
  ];

  /** 選択してるキャラクターID */
  selectedCharacterId: number = 1;

  constructor(private openAiService: OpenAiService, private router: Router) {}

  next() {
    this.selectedCharacterId++;
  }

  back() {
    this.selectedCharacterId--;
  }

  enter() {
    const selectedCharacter = this.characters.find(
      (element) => element.id === this.selectedCharacterId
    );

    const request = {
      character: selectedCharacter!.name,
    };

    this.openAiService.sendCharacter(request).subscribe((res) => {
      this.router.navigate(['/discussion']);
    });
  }
}
