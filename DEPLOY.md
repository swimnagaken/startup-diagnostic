# 起業ロードマップ診断システム - デプロイガイド

独自ドメインを取得されたとのことで、本番環境へのデプロイ手順をまとめます。

## 📋 目次

1. [前提条件](#前提条件)
2. [ホスティングサービスの選択](#ホスティングサービスの選択)
3. [GitHub Pagesでのデプロイ（推奨）](#github-pagesでのデプロイ)
4. [Netlifyでのデプロイ](#netlifyでのデプロイ)
5. [独自ドメインの設定](#独自ドメインの設定)
6. [SSL証明書の設定](#ssl証明書の設定)

---

## 前提条件

- ✅ 独自ドメインを取得済み
- ✅ GitHubアカウント（推奨）
- ✅ Googleスプレッドシート＋Apps Script設定済み

---

## ホスティングサービスの選択

### おすすめ: GitHub Pages（無料）

**メリット:**
- 完全無料
- 簡単なデプロイ
- 自動SSL証明書
- 独自ドメイン対応

**デメリット:**
- 公開リポジトリ必須（無料プラン）
- ビルドステップなし（静的ファイルのみ）

### 代替案: Netlify（無料）

**メリット:**
- 自動ビルド・デプロイ
- プレビュー機能
- フォーム処理機能

**デメリット:**
- 帯域制限あり（月100GB）

---

## GitHub Pagesでのデプロイ

### ステップ1: GitHubリポジトリ作成

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例: `startup-diagnostic`）
4. 「Public」を選択
5. 「Create repository」をクリック

### ステップ2: ファイルをアップロード

#### 方法A: ブラウザから直接アップロード

1. 「uploading an existing file」をクリック
2. `startup-diagnostic`フォルダ内の全ファイルをドラッグ&ドロップ
3. 「Commit changes」をクリック

#### 方法B: Git コマンドを使う

```bash
# ローカルでGitリポジトリを初期化
cd /path/to/startup-diagnostic
git init
git add .
git commit -m "Initial commit"

# GitHubリポジトリにプッシュ
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/startup-diagnostic.git
git push -u origin main
```

### ステップ3: GitHub Pagesを有効化

1. リポジトリの「Settings」タブをクリック
2. 左メニューから「Pages」を選択
3. 「Source」で「Deploy from a branch」を選択
4. 「Branch」で「main」を選択、フォルダは「/ (root)」
5. 「Save」をクリック

数分後、以下のURLでアクセス可能になります：
```
https://YOUR_USERNAME.github.io/startup-diagnostic/
```

---

## Netlifyでのデプロイ

### ステップ1: Netlifyアカウント作成

1. https://app.netlify.com/ にアクセス
2. GitHubアカウントでサインアップ

### ステップ2: サイトをデプロイ

1. 「Add new site」→「Import an existing project」
2. GitHubを選択し、リポジトリを接続
3. ビルド設定（静的サイトなので不要）
4. 「Deploy site」をクリック

自動的にランダムなURLが発行されます：
```
https://random-name-12345.netlify.app
```

---

## 独自ドメインの設定

取得したドメインが **example.com** と仮定します。

### GitHub Pagesの場合

#### ステップ1: GitHubでカスタムドメイン設定

1. リポジトリの「Settings」→「Pages」
2. 「Custom domain」に `診断.example.com` または `startup.example.com` を入力
3. 「Save」をクリック
4. 「Enforce HTTPS」にチェック（DNS設定後に有効化）

#### ステップ2: DNS設定

ドメインレジストラ（お名前.comやムームードメインなど）の管理画面で：

**Aレコード（ルートドメイン example.com の場合）:**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
TTL: 3600
```

**CNAMEレコード（サブドメイン startup.example.com の場合）:**
```
Type: CNAME
Name: startup（または診断）
Value: YOUR_USERNAME.github.io
TTL: 3600
```

### Netlifyの場合

#### ステップ1: Netlifyでカスタムドメイン設定

1. サイトの「Domain settings」をクリック
2. 「Add custom domain」をクリック
3. ドメイン名を入力（例: `startup.example.com`）
4. 「Verify」をクリック

#### ステップ2: DNS設定

Netlifyが自動的にDNS設定を案内してくれます。

**推奨: Netlify DNSを使う場合:**
1. 「Set up Netlify DNS」をクリック
2. ドメインレジストラでネームサーバーを変更：
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

**または、CNAMEレコードを追加:**
```
Type: CNAME
Name: startup
Value: YOUR_SITE_NAME.netlify.app
TTL: 3600
```

---

## SSL証明書の設定

### GitHub Pages
- DNS設定後、自動的にLet's Encryptの証明書が発行されます
- 24時間以内に有効化
- 「Enforce HTTPS」にチェックを入れる

### Netlify
- 自動的にLet's Encryptの証明書が発行されます
- 即座に有効化

---

## デプロイ後の確認

### ✅ チェックリスト

1. [ ] サイトが表示される
2. [ ] すべてのページが正しく動作する
3. [ ] Googleスプレッドシートにデータが保存される
4. [ ] HTTPSでアクセスできる
5. [ ] モバイルで正しく表示される

### トラブルシューティング

#### サイトが表示されない
- DNS設定が反映されるまで最大48時間かかる場合があります
- `nslookup YOUR_DOMAIN` で確認

#### CSSが適用されない
- `style.css` のパスが正しいか確認
- ブラウザのキャッシュをクリア（Ctrl+Shift+R）

#### JavaScriptが動作しない
- ブラウザのコンソール（F12）でエラーを確認
- `app.js` の `GOOGLE_SCRIPT_URL` が正しく設定されているか確認

---

## 更新・メンテナンス

### ファイルを更新する場合

#### GitHub Pages
```bash
# ファイルを編集後
git add .
git commit -m "Update診断ロジック"
git push
```
数分後に自動的に反映されます。

#### Netlify
- GitHubにプッシュすると自動的にデプロイ
- または、Netlifyの管理画面から手動デプロイ

---

## パフォーマンス最適化

### 画像の最適化
現在は絵文字を使用していますが、ロゴ画像を追加する場合：
- WebP形式を使用
- 適切なサイズにリサイズ
- CDN経由で配信

### ファイルの圧縮
本番環境では、HTMLやCSS、JavaScriptを圧縮することを推奨：
```bash
# npmでminifyツールをインストール
npm install -g html-minifier clean-css-cli uglify-js

# ファイルを圧縮
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
cleancss style.css -o style.min.css
uglifyjs app.js -c -m -o app.min.js
```

---

## セキュリティ

### CSP（Content Security Policy）の設定

`index.html` の `<head>` に追加：
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://unpkg.com 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://script.google.com;">
```

---

## アクセス解析

### Google Analyticsの設定

1. Google Analytics 4のプロパティを作成
2. 測定IDを取得（例: G-XXXXXXXXXX）
3. `index.html` の `</head>` の直前に追加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## サポート

デプロイで困ったことがあれば、以下を確認：
1. このREADME.md
2. ホスティングサービスのドキュメント
3. GitHubのIssues

---

**🎉 デプロイ完了後、起業支援がさらに効果的になることを願っています！**
