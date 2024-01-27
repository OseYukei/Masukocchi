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
        '喧嘩ですか…。わかりました。<br>わたくしがその喧嘩に判決を下しましょう。<br>喧嘩の原因やお二人の主張をしっかりと伺い、勝訴か、敗訴かの判決を下します。お二人とも、正しい心をもって裁判に挑んでください。<br><br><br>判決結果：<br>　両者の意見を聞き、<br>　「勝訴」か「敗訴」かの判決を下します。<br><br>向いてる場面：<br>　どちらが悪いか白黒つけたいとき<br>',
    },
    {
      id: 2,
      name: 'オネエ',
      img: 'assets/character/okama.png',
      description:
        'あらどうもいらっしゃい！<br>なに～、あなたたち喧嘩しちゃったの？<br>しょうがないわね…私が話聞いてあげるからあんたたち少し落ち着きなさい！どっちが悪いのか、それとも二人とも悪いのか、話を聞けばすぐわかるんだから！<br><br><br>判決結果：<br>　両者の意見を聞き、仲裁してくれます。<br><br><br>向いてる場面：<br>　お互いの主張を受け入れたいとき<br>　勝敗が決めにくいとき',
    },
    {
      id: 3,
      name: '全肯定マン',
      img: 'assets/character/kanzenkoutei.png',
      description:
        'やあ！こんにちは！世の中のすべてをポジティブに<br>受け入れる、全肯定マンだ！みんなの意見も、<br>感情も、何でも大歓迎！すべて肯定してみせる！<br>さぁ、ポジティブエネルギー全開で受け取って、<br>みんなでハッピーな時間を過ごそうぜ！<br><br><br>判決結果：<br>　両者の意見を全肯定してくれます。<br><br><br>向いてる場面：<br>　とにかく肯定されたいとき',
    },
    {
      id: 4,
      name: '全否定マン',
      img: 'assets/character/kanzenhitei.png',
      description:
        'よく来たな、愚かなる者ども…俺は全否定マン。<br>世の中のあらゆる意見を跳ね除け、暗黒の中で支配を狙う者だ。喧嘩をしたからどちらが悪いか判断してほしいだと？ふん、貴様らの喧嘩も、くだらん主張もどうでもいい。貴様らのその主張、この俺様がすべて否定してやる…。<br><br>判決結果：<br>　両者の意見を全否定してくれます。<br><br><br>向いてる場面：<br>　とにかく否定されたいとき',
    },
    {
      id: 5,
      name: '追加予定キャラクター',
      img: 'assets/character/comming-soon.png',
      description:
        '<br><br>次期アップデートにて追加実装予定<br>アップデートをお待ちください…<br><br><br><br>判決結果：<br>　<br><br><br>向いてる場面：<br>',
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
