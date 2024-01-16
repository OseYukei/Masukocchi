import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenAiService } from '../../service/open-ai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /** フォーム */
  form: FormGroup;

  /** メッセージ一覧 */
  messages: { content: string; isMine: boolean }[] = [];

  /** 通信中か否か */
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private openAiService: OpenAiService) {
    // フォームの設定
    this.form = this.formBuilder.group({
      message: ['', Validators.required],
    });

    // 本ページ表示時にメッセージ履歴をリセットするリクエストを送る
    this.openAiService.reset().subscribe();
  }

  /**
   * 送信
   */
  send() {
    const message = this.message.value;

    // メッセージ領域と入力を更新
    this.messages.push({ content: message, isMine: true });
    this.message.setValue('');
    this.isLoading = true;

    this.scrollToBottom();

    this.openAiService.sendChat({ content: message }).subscribe({
      next: (res) => {
        // メッセージ領域
        this.messages.push({ content: res.answer, isMine: false });
        this.scrollToBottom();
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * メッセージ領域を最下部にスクロール
   * ほんとはViewChildとか使ったほうが良い
   */
  scrollToBottom() {
    setTimeout(() => {
      document.getElementById('messages')?.scrollTo(0, 9999);
    }, 100);
  }

  /**
   * フォームグループ内のメッセージフォームを取得
   */
  private get message() {
    return this.form.controls['message'];
  }
}
