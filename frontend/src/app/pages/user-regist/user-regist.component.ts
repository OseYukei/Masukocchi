import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenAiService } from '../../service/open-ai.service';

@Component({
  selector: 'app-user-regist',
  templateUrl: './user-regist.component.html',
  styleUrl: './user-regist.component.scss',
})
export class UserRegistComponent {
  genders = ['男性', '女性'];

  personalities = [
    // 'さみしがり',
    'いじっぱり',
    'やんちゃ',
    'ひかえめ',
    // 'おっとり',
    'せっかち',
    'まじめ',
    'きまぐれ',
    // 'なまけもの',
    // 'あざとい',
    'いいかげん',
    // 'メンヘラ',
    '自分勝手',
    '嘘つき',
    '頑固',
    '気分屋',
    '威圧的',
  ];

  form: FormGroup;

  isFirst = true;

  constructor(
    private formBuilder: FormBuilder,
    private openAiService: OpenAiService,
    private router: Router
  ) {
    // フォームの設定
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      personality: ['', Validators.required],
    });
  }

  onSubmit() {
    const request = {
      name: this.form.controls['name'].value,
      gender: this.form.controls['gender'].value,
      age: this.form.controls['age'].value,
      personality: this.form.controls['personality'].value,
    };

    this.openAiService.userRegist(request).subscribe((res) => {
      if (res.result === 'next') {
        this.isFirst = false;
        this.form.controls['name'].setValue('');
        this.form.controls['gender'].setValue('');
        this.form.controls['age'].setValue('');
        this.form.controls['personality'].setValue('');
      } else {
        this.router.navigate(['/character-select']);
      }
    });
  }
}
