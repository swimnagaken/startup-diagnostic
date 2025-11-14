# 起業ロードマップ診断システム

CLIP長岡向けの起業支援診断ツールです。起業希望者の現在の状況を診断し、最適な支援内容を提案します。

## ファイル構成

```
startup-diagnostic/
├── index.html              # メインHTMLファイル
├── style.css               # スタイルシート
├── app.js                  # JavaScriptアプリケーション本体
├── google-apps-script.gs   # Googleスプレッドシート連携用スクリプト
└── README.md               # このファイル
```

## 機能

### 主要機能
- ✅ マルチステップフォーム（条件分岐対応）
- ✅ 回答内容に応じた動的な質問表示
- ✅ 詳細な診断結果とフェーズ判定
- ✅ Googleスプレッドシートへのデータ自動保存
- ✅ レスポンシブデザイン（スマホ対応）
- ✅ 改善された診断ロジック
- ✅ 業種別の推奨支援内容

### 診断フェーズ
1. アイデア検証・構想段階
2. 事業計画策定段階
3. 資金調達準備段階
4. 開業準備・手続き段階
5. 開業直後・販路開拓段階

## セットアップ手順

### 1. Googleスプレッドシートの準備

1. 新しいGoogleスプレッドシートを作成
2. シート名を「診断結果」にする
3. スプレッドシートのURLから「SPREADSHEET_ID」をコピー
   - URL例: `https://docs.google.com/spreadsheets/d/【ここがSPREADSHEET_ID】/edit`

### 2. Google Apps Scriptの設定

1. Googleスプレッドシートを開く
2. メニューから「拡張機能」→「Apps Script」を選択
3. `google-apps-script.gs` の内容をコピー＆ペースト
4. `SPREADSHEET_ID` を実際のIDに置き換える
5. 「デプロイ」→「新しいデプロイ」をクリック
6. 「種類の選択」→「ウェブアプリ」を選択
7. 設定:
   - 説明: 起業ロードマップ診断
   - 次のユーザーとして実行: 自分
   - アクセスできるユーザー: 全員
8. 「デプロイ」をクリック
9. 表示された「ウェブアプリのURL」をコピー

### 3. HTMLファイルの設定

1. `app.js` を開く
2. 2行目の `GOOGLE_SCRIPT_URL` を、コピーしたウェブアプリのURLに置き換える
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/...../exec';
   ```

### 4. 動作確認

1. `index.html` をブラウザで開く
2. 診断フォームに回答
3. Googleスプレッドシートにデータが保存されることを確認

## カスタマイズ

### デザインのカスタマイズ

`style.css` を編集してください。

#### ブランドカラーの変更
```css
/* メインカラー（グラデーション）を変更 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* ↓ CLIP長岡のブランドカラーに変更 */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### 診断ロジックのカスタマイズ

`app.js` の `getDiagnosticResult()` 関数を編集してください。

### 質問の追加・変更

`app.js` の質問セクションを編集してください。

## トラブルシューティング

### データがスプレッドシートに保存されない

1. Google Apps Scriptのウェブアプリが正しくデプロイされているか確認
2. `app.js` の `GOOGLE_SCRIPT_URL` が正しく設定されているか確認
3. ブラウザのコンソール（F12）でエラーメッセージを確認

### CORSエラーが出る

- Google Apps Scriptのデプロイ設定で「アクセスできるユーザー」が「全員」になっているか確認
- `mode: 'no-cors'` を使用しているため、通常はエラーにならないはず

### メール通知が届かない

1. Google Apps Scriptの `sendEmailNotification()` 関数を確認
2. 送信元メールアドレスの設定を確認
3. Gmail APIの権限を確認

## 本番環境へのデプロイ

### 静的サイトホスティング

以下のサービスで無料ホスティング可能:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

#### GitHub Pagesの例

1. GitHubリポジトリを作成
2. ファイルをアップロード
3. Settings → Pages → Source を「main branch」に設定
4. 公開URLからアクセス

### 独自ドメインの設定

各ホスティングサービスで独自ドメインの設定が可能です。

## データ分析

### Looker Studioでダッシュボード作成

1. Looker Studio (https://lookerstudio.google.com/) にアクセス
2. 「作成」→「データソース」をクリック
3. 「Google スプレッドシート」を選択
4. 診断結果のスプレッドシートを選択
5. ダッシュボードを作成

### 分析項目の例
- フェーズ別の起業希望者数
- 業種別の分布
- 困りごとランキング
- 時系列推移
- 支援ニーズの傾向

## ライセンス

このプロジェクトは CLIP長岡 のために作成されました。

## サポート

質問や不具合報告は、CLIP長岡の担当者までご連絡ください。

---

作成日: 2025年11月
バージョン: 1.0.0
