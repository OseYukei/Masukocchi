# ハッカソンだーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

## 準備しておくもの

- アプリ
  - VScode
  - SourceTree
  - node.js
  - （入ってないなら）Chrome
- Github のアカウント
  - https://github.com/signup?source=login
  - 頑張って作って
  - 出来たら大瀬に招待してもらう
- Mattermost のアカウント
  - ここから作れます
  - https://mattermost.0se.uk/signup_user_complete/?id=sxnhi6m8gjdrbd6kp7ne98bkrc&md=link&sbr=fa
  - これも出来たら大瀬に教えて

## 環境構築

### Node.js

1. nvm をインストール (https://zenn.dev/y_2_k/articles/e419bcf729e82d)
2. `nvm install 20.11.0`を実行
3. `nvm use 20.11.0`を実行
4. `node --version`と`npm --version`をそれぞれ実行出来ることを確認

### Angular

1. 任意のディレクトリで`npm install -g @angular/cli`を実行
2. コマンドプロンプトで`ng version`を実行して色々表示されることを確認

### 環境変数

1. OpenAI の API キーを取得し環境変数に設定する

- 変数名：OPEN_AI_API_KEY
- 変数値：OpenAI の API キー

  ※ 設定した後にコンソールの再起動とかしないと反映されないかも

### ソースコードのフォーマット設定 ※できれば

1. vscode の拡張機能の prettier をインストール
2. vscode の設定で`Editor: Format On Save`を有効にする
3. ファイルを保存するタイミングで自動フォーマットがかかる

   ※フォーマットされない場合は他のフォーマッタと競合してるので解消頑張る

## 起動するまでの手順

1. https://github.com/OseYukei/Masukocchi.git をクローン
2. コンソールを起動
3. Masukocchi のディレクトリに移動
4. `npm run setup`を実行 ※初回だけ
5. `npm run back`でバックエンド起動
6. `npm run front`でフロントエンド起動
7. http://localhost:4200/home にアクセス

## 気をつけるもの

- ChatGPT のアクセスキーは環境変数に入れるように気をつける
- 2 日目終わったらご飯は無し！帰れ！
