export interface GetSettingResponse {
  character: Character;
  nameA: string;
  nameB: string;
}

export type Character =
  | "裁判官"
  | "オネエ"
  | "全肯定マン"
  | "全否定マン"
  | "追加予定キャラクター";
