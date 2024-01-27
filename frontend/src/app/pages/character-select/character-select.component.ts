import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenAiService } from '../../service/open-ai.service';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrl: './character-select.component.scss',
})
export class CharacterSelectComponent {
  /** キャラクター一覧 */
  characters: { id: number; name: string; img: string; description: string }[] = [
    {
      id: 1,
      name: '裁判官',
      img: '../../assets/saibankan.png',
      description: '説明文',
    },
    {
      id: 2,
      name: 'オネエ',
      img: '../../assets/okama.png',
      description: '説明文',
    },
    {
      id: 3,
      name: '全肯定マン',
      img: '../../assets/kanzenkoutei.png',
      description: '説明文',
    },
    {
      id: 4,
      name: '全否定マン',
      img: '../../assets/kanzenhitei.png',
      description: '説明文',
    },
  ];

  selectedCharacterId: number = 1;

  next() {
    this.selectedCharacterId++;
  }

  back() {
    this.selectedCharacterId--;
  }

  enter() {}
}
