export interface DiscussionRequest {
  /** 関係性 */
  relationship: string;

  /** 喧嘩している理由 */
  reason: string;

  /** Aの意見 */
  opinionA: string;

  /** Bの意見 */
  opinionB: string;
}

export interface DiscussionResponse {
  /** 結果 */
  answer: string;
}
