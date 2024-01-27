diff a/common/types/chat.ts b/common/types/chat.ts	(rejected hunks)
@@ -1,14 +0,0 @@
-/**
- *
- * フロントエンドとバックエンドで同じ型使えると楽かもなのでcommon/typesに作っていきたい
- * 基本的にはリクエストの型とレスポンスの型をセットで定義する
- *
- */
-
-export interface ChatRequest {
-  content: string;
-}
-
-export interface ChatResponse {
-  answer: string;
-}
