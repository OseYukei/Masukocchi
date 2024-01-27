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
        '喧嘩ですか…。わかりました。わたくしがその喧嘩に判決を下しましょう。喧嘩の原因やお二人の主張をしっかりと伺い、勝訴か、敗訴かの判決を下します。お二人とも、正しい心をもって裁判に挑んでください。',
    },
    {
      id: 2,
      name: 'オネエ',
      img: 'assets/character/okama.png',
      description:
        'あらどうもいらっしゃい！なに～、あなたたち喧嘩しちゃったの？しょうがないわね…私が話聞いてあげるからあんたたち少し落ち着きなさい！どっちが悪いのか、それとも二人とも悪いのか、話を聞けばすぐわかるんだから！',
    },
    {
      id: 3,
      name: '全肯定マン',
      img: 'assets/character/kanzenkoutei.png',
      description:
        'やあ！こんにちは！世の中のすべてをポジティブに受け入れる、全肯定マンだ！みんなの意見も、感情も、何でも大歓迎！すべて肯定してみせる！さぁ、ポジティブエネルギー全開で受け取って、みんなでハッピーな時間を過ごそうぜ！',
    },
    {
      id: 4,
      name: '全否定マン',
      img: 'assets/character/kanzenhitei.png',
      description:
        'よく来たな、愚かなる者ども…俺は全否定マン。世の中のあらゆる意見を跳ね除け、暗黒の中で支配を狙う者だ。喧嘩をしたからどちらが悪いか判断してほしいだと？ふん、貴様らの喧嘩も、くだらん主張もどうでもいい。貴様らのその主張、この俺様がすべて否定してやる…。',
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
