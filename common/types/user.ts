/**
 * ユーザ情報設定時のリクエスト
 */
export interface UserRegistRequest {
  /** 名前 */
  name: string;

  /** 性別 */
  gender: string;

  /** 年齢 */
  age: number;

  /** 性格 */
  personality: string;
}

/**
 * ユーザ情報設定時のレスポンス
 */
export interface UserRegistResponse {
  /** 結果 1人目設定完了時：next, 2人目設定完了時: complete */
  result: "next" | "complete";
}
