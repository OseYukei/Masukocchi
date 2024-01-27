import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DiscussionRequest } from '../../../../../common/types/discussion';
import { Character, GetSettingResponse } from '../../../../../common/types/setting';
import { OpenAiService } from '../../service/open-ai.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.scss',
})
export class DiscussionComponent implements OnInit {
  questions: Question[] = [
    {
      character: '裁判官',
      relationship: 'あなた達はどのような関係ですか？',
      reason: 'この喧嘩の理由はなんですか？',
      opinion: 'さんの主張を述べてください',
    },
    {
      character: 'オネエ',
      relationship: 'あなた達どういう関係なの？',
      reason: 'なんで喧嘩なんかしちゃったのよ？',
      opinion: 'ちゃんの意見を教えてちょうだい',
    },
    {
      character: '全肯定マン',
      relationship: '君達はどういった関係なんだい？',
      reason: 'どうして喧嘩なんかしてしまったんだい？',
      opinion: '君はどう思っているんだい？',
    },
    {
      character: '全否定マン',
      relationship: '貴様らどんな関係なんだ…？',
      reason: 'なぜ喧嘩をしたんだ…？',
      opinion: 'はどう考えているんだ…',
    },
  ];

  /**
   * ・2人の関係性
   * ・なんで喧嘩してるのか
   * ・Aの意見
   * ・Bの意見
   */
  question = '';

  avater = '';

  setting: GetSettingResponse | null = null;

  form: FormGroup;

  currentScence: Scence = 'relationship';

  isLoading = false;

  discussion: DiscussionRequest = {
    relationship: '',
    reason: '',
    opinionA: '',
    opinionB: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private openAiService: OpenAiService,
    private router: Router
  ) {
    // フォームの設定
    this.form = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.openAiService.getSetting().subscribe((res) => {
      this.setting = res;
      switch (this.setting.character) {
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
      this.currentScence = 'relationship';
      this.question = this.getCharaQuestion();
    });
  }

  getCharaQuestion() {
    const qu = this.questions.filter((q) => q.character === this.setting?.character)[0];
    switch (this.currentScence) {
      case 'relationship':
        return qu.relationship;
      case 'reason':
        return qu.reason;
      case 'opinionA':
        return this.setting?.nameA + qu.opinion;
      case 'opinionB':
        return this.setting?.nameB + qu.opinion;
    }
  }

  onClickButton() {
    switch (this.currentScence) {
      case 'relationship':
        this.discussion.relationship = this.message.value;
        this.message.setValue('');
        this.currentScence = 'reason';
        break;
      case 'reason':
        this.discussion.reason = this.message.value;
        this.message.setValue('');
        this.currentScence = 'opinionA';
        break;
      case 'opinionA':
        this.discussion.opinionA = this.message.value;
        this.message.setValue('');
        this.currentScence = 'opinionB';
        break;
      case 'opinionB':
        this.discussion.opinionB = this.message.value;
        this.isLoading = true;
        this.openAiService.discuss(this.discussion).subscribe((res) => {
          this.isLoading = false;
          sessionStorage.setItem('answer', res.answer);
          // TODO:結果画面のパス決まり次第ちゃんと設定
          this.router.navigate(['result']);
        });
        break;
    }
    this.question = this.getCharaQuestion();
  }

  get message() {
    return this.form.controls['message'];
  }
}

interface Question {
  character: Character;
  relationship: string;
  reason: string;
  opinion: string;
}

type Scence = 'relationship' | 'reason' | 'opinionA' | 'opinionB';
