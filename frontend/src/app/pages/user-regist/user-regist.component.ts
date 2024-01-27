import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenAiService } from '../../service/open-ai.service';

@Component({
  selector: 'app-user-regist',
  templateUrl: './user-regist.component.html',
  styleUrl: './user-regist.component.scss',
})
export class UserRegistComponent {
  genders = ['男性', '女性'];

  personalities = ['さみしがり', 'いじっぱり', 'やんちゃ'];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private openAiService: OpenAiService) {
    // フォームの設定
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      personality: ['', Validators.required],
    });
  }
}
