# ARAISE 公式サイト 要件定義書

**バージョン:** 1.0  
**作成日:** 2026-04-13  
**対象URL:** https://araise.salon  
**コードパス:** `/Users/nishikimasae/Desktop/workspace/products/lp-site/`

---

## 1. プロジェクト概要

### 目的
- 現行 araise.salon（元従業員の個人GitHubで管理・引き継ぎ不可）をゼロから再構築する
- HPBに依存した集客から、自社サイト起点の集客・SEOへ移行する
- SNS（Threads）の発信を自動でSEO記事に転換し、オーガニック流入を作る

### ゴール指標
- Phase 1: araise.salon でサイトが表示される
- Phase 2: メニュー・価格をSupabaseで管理できる
- Phase 3: Threads投稿からSEO記事が自動生成・公開される

---

## 2. 技術スタック（確定）

| 項目 | 技術 | 備考 |
|---|---|---|
| フレームワーク | Next.js 16.2.2 (App Router) | package.json確認済み |
| スタイリング | Tailwind CSS v4 | globals.css確認済み |
| データベース | Supabase | @supabase/supabase-js 導入済み |
| デプロイ | Vercel | 無料プラン |
| ドメイン | araise.salon | お名前.com取得済み |
| アナリティクス | GA4（G-PSJCVT7W8Q） | 現行サイトから引き継ぎ |
| 言語 | TypeScript | tsconfig.json確認済み |

**注意:** Geistフォントが初期設定されているが、ARAISE用フォント（Noto Serif JP / Cormorant Garamond）に差し替える。

---

## 3. 機能要件

### Phase 1 — ホームLP（最優先・静的）

#### 3.1 ページ構成

| ページ | パス | 種別 |
|---|---|---|
| ホーム | `/` | 静的（全セクションスクロール完結）|

#### 3.2 セクション構成（上から順）

| # | セクション | コンテンツ | 備考 |
|---|---|---|---|
| 1 | Header | ロゴ・ナビ（メニュー・アクセス・予約） | スクロール追従 |
| 2 | Hero | キャッチコピー・背景画像・予約CTAボタン | 全画面 |
| 3 | Features | 3〜4つの強み（完全個室・深夜営業・歴10年・アーユルヴェーダ専門）| アイコン+テキスト |
| 4 | Services | 4サービス概要カード（アーユルヴェーダ・タイ古式・ヘッドスパ・足裏）| 画像+名前+価格帯 |
| 5 | Course | 組み合わせコース紹介 | |
| 6 | Price | 価格表（簡略版）| Phase 2でSupabase連動 |
| 7 | Access | 住所・営業時間・地図（Google Maps embed）| |
| 8 | Footer | 予約リンク・SNSリンク・コピーライト | |

#### 3.3 CTA（コンバージョン設計）

- メインCTA: 「ご予約はこちら」→ HPB予約ページ（別タブ）
- サブCTA: Instagram・Threads フォロー
- 電話リンク: `tel:` でワンタップ発信（電話番号は後で確認）
- CTAは Hero・Price・Footer の3箇所に設置

#### 3.4 SEO基本設定

```
title: ARAISE（アレイズ）| 二子玉川のアーユルヴェーダ・タイ古式・ヘッドスパ
description: 二子玉川駅徒歩5分。完全個室・深夜0時まで営業。施術歴平均10年のセラピストによるアーユルヴェーダ・タイ古式マッサージ・ドライヘッドスパ。
OGP画像: 設定する（1200×630px）
```

---

### Phase 2 — メニュー・クーポン管理（Supabase連動）

#### 3.5 メニューページ

| ページ | パス |
|---|---|
| メニュー一覧 | `/menu` |

- Supabase `menus` テーブルから取得・表示
- カテゴリ別タブ切り替え（アーユルヴェーダ / タイ古式 / ヘッドスパ / 足裏 / コース）
- 各メニュー: 施術名・時間・価格・説明

#### 3.6 Supabaseテーブル（Phase 2）

**menus**
| カラム | 型 | 説明 |
|---|---|---|
| id | UUID | PK |
| category | TEXT | 'ayurveda' / 'thai' / 'headspa' / 'foot' / 'combo' |
| name | TEXT | 施術名 |
| duration | INTEGER | 時間（分）|
| price | INTEGER | 価格（円）|
| description | TEXT | 説明文 |
| is_popular | BOOLEAN | 人気フラグ |
| sort_order | INTEGER | 表示順 |

**coupons**
| カラム | 型 | 説明 |
|---|---|---|
| id | UUID | PK |
| title | TEXT | クーポン名 |
| discount | TEXT | 割引内容 |
| platform | TEXT[] | ['hpb', 'salon_answer', 'web'] |
| valid_until | DATE | 有効期限 |
| is_active | BOOLEAN | 表示フラグ |

---

### Phase 3 — SNS連動・SEO記事自動生成

#### 3.7 ブログページ

| ページ | パス |
|---|---|
| 記事一覧 | `/blog` |
| 記事詳細 | `/blog/[slug]` |

- Threads投稿 → Claude API → SEO記事生成 → Supabase保存
- 公開フラグ（`published`）で手動承認してから公開
- SSG + `revalidate` でキャッシュ管理

#### 3.8 Supabaseテーブル（Phase 3）

**posts**（Threads投稿保存）
| カラム | 型 |
|---|---|
| platform_id | TEXT UNIQUE |
| content | TEXT |
| processed | BOOLEAN |

**articles**（生成SEO記事）
| カラム | 型 |
|---|---|
| slug | TEXT UNIQUE |
| title | TEXT |
| content | TEXT（Markdown）|
| excerpt | TEXT |
| keywords | TEXT[] |
| published | BOOLEAN |
| source_post_id | UUID → posts.id |

---

### Phase 4 — Admin画面（運用）

| ページ | パス | 機能 |
|---|---|---|
| 管理トップ | `/admin` | ダッシュボード |
| メニュー管理 | `/admin/menus` | CRUD |
| クーポン管理 | `/admin/coupons` | CRUD |
| 記事承認 | `/admin/articles` | 公開/非公開切り替え |

- 認証: Supabase Auth（メールアドレス+パスワード）
- アクセス制限: 管理者のみ

---

## 4. 非機能要件

### パフォーマンス
- Lighthouse スコア 90以上（モバイル）
- 画像は全て `next/image` で最適化
- Phase 1は静的生成（SSG）のみ → 最速

### レスポンシブ
- モバイルファースト設計
- ブレークポイント: 375px / 768px / 1280px
- タップターゲット 44px以上

### アクセシビリティ
- 画像に alt テキスト
- フォームにラベル
- コントラスト比 4.5:1 以上

### セキュリティ
- Supabase RLS 全テーブル有効化必須
- `ANTHROPIC_API_KEY` はサーバーサイドのみ（`NEXT_PUBLIC_` 禁止）
- Admin画面は認証必須

---

## 5. デザイン仕様

### カラーパレット（確定値は実装時に決定）

| 役割 | 色 | 用途 |
|---|---|---|
| Primary | ゴールド系 `#C8A96E` | CTA・強調 |
| Background | クリーム `#FAF8F5` | ページ背景 |
| Text | ダークブラウン `#2C1810` | 本文 |
| Accent | ディープグリーン | アーユルヴェーダ感 |

### フォント

| 役割 | フォント |
|---|---|
| セクション見出し（英字） | Cormorant Garamond |
| 日本語見出し | Noto Serif JP |
| 本文 | Noto Sans JP |

### トーン
- 高級感あり・敷居は低い
- 清潔・静寂・プロフェッショナル
- 「戦闘状態のあなたが来ていい場所」

---

## 6. 制約・前提条件

### 法的制約
- 薬機法・医療広告ガイドライン適用
- 「治る」「効く」「改善する」等の効能表現は禁止
- 体験談は「次の来店で〜と言ってくれた」形式のみ使用可

### 外部サービス制約
- HPB・サロンアンサーにAPIなし → 手動コピー運用
- Threads API: Meta Developer App承認が必要（Phase 3前に申請）

### コスト制約
- Phase 2まで完全無料（GitHub / Vercel / Supabase 無料枠）
- Phase 3〜: Claude API費用（月$1〜2程度）

---

## 7. フェーズ別タスクリスト

### Phase 1（即着手可能・条件: GitHubアカウント + DNS変更）

- [ ] globals.css をARASIEブランドに変更（フォント・カラー）
- [ ] layout.tsx にGA4・メタデータ設定
- [ ] Header コンポーネント
- [ ] Hero セクション（写真・コピー・CTAボタン）
- [ ] Features セクション（4つの強み）
- [ ] Services セクション（4サービスカード）
- [ ] Price セクション（静的テーブル）
- [ ] Access セクション（営業時間・地図）
- [ ] Footer
- [ ] GitHub Push → Vercel デプロイ
- [ ] お名前.com DNS変更 → araise.salon 接続

### Phase 2（Supabase ENV設定後）

- [ ] Supabaseプロジェクト作成・ENV設定
- [ ] menus / coupons テーブル作成・RLS設定
- [ ] メニューデータ投入
- [ ] `/menu` ページ実装
- [ ] ホームのPrice欄をSupabase連動に変更

### Phase 3（Meta Developer App承認後）

- [ ] Threads API接続（`lib/threads.ts`）
- [ ] Claude API記事生成（`lib/claude.ts`）
- [ ] sync-threads API Route
- [ ] `/blog` / `/blog/[slug]` ページ実装
- [ ] Vercel Cron設定（週次自動実行）

### Phase 4

- [ ] Supabase Auth設定
- [ ] `/admin` 画面実装（メニュー・クーポン・記事CRUD）

---

## 8. 未確定事項（着手前に確認が必要）

| 項目 | 確認先 | フェーズ |
|---|---|---|
| 電話番号 | オーナー | Phase 1 |
| Heroに使う写真のパス | オーナー（Google Drive）| Phase 1 |
| ロゴファイルのパス | Google Drive確認済み・パス未取得 | Phase 1 |
| GitHubアカウント（2FA問題）| `gh auth status` で確認 | Phase 1前 |
| Supabaseプロジェクトの有無 | `.env.local` 確認 | Phase 2前 |
