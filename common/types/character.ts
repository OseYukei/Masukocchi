import { Character } from "./setting";


export interface CharacterRegistRequest {
  // 選択したキャラクタ
  character: Character;
}

export interface CharacterRegistResponse{
  isSuccess: boolean;
}
