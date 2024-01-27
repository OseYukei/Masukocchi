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
      description: '説明文',
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
      description: '説明文',
    },
    {
      id: 4,
      name: '全否定マン',
      img: 'assets/character/kanzenhitei.png',
      description: '説明文',
    },
  ];

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
