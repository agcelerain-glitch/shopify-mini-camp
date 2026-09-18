# CLAUDE.md — Shopify e-learning プロジェクト設計書

> このファイルは Claude Code が会話の冒頭に読み込み、プロジェクト全体の文脈を把握するための設計書です。
> 実装・コンテンツ作成・AI支援のいずれの作業においても、まずこのファイルを参照してください。

---

## 1. プロジェクト概要

### 目的
Shopify に関する実務知識を体系的に習得しながら、同時に e-learning 教材として出力・公開するプロジェクト。
**知識習得とコンテンツ生産を並行して進める**ことが最大の特徴。

### 対象ユーザー（学習者）
| タイプ | 説明 |
|---|---|
| 個人事業主・小規模事業者 | EC 未経験からストアを自分で作りたい人 |
| 法人 EC 担当者 | 既存事業の EC 化・Shopify 移行を担当する社員 |
| 越境 EC 事業者 | 海外向け販売を Shopify で展開したい事業者 |
| Shopify エンジニア志望 | フリーランス・副業で Shopify 開発を受注したい人 |

### コンテンツ方針
- 日本語で書く（対象は日本語話者）
- 実際の Shopify 管理画面のスクリーンショットを使った手順解説を基本とする
- 理論より操作・判断を重視する（「なぜそうするか」を添えた実務ファースト）
- 各ユニットはミニクイズで終わる（理解度の即時確認）
- 内容は 2026 年 9 月時点の Shopify 仕様に基づく（変更追跡は別途 TODO で管理）

---

## 2. ファイル構成と各ファイルの役割

```
shopify_elearning/              ← プロジェクトルート
├── CLAUDE.md                   ← 【本ファイル】全体設計書（Claude が最初に読む）
├── requirements.md             ← カリキュラム要件定義（フェーズ・レベル・ユニット一覧）
└── other/
    ├── article_origin.txt      ← 元データ（HTML 生データ。触らない）
    ├── article_rag.txt         ← RAG 用クリーンテキスト（2 記事・引用リンク保持）
    ├── article_sum.txt         ← 知識サマリー（22 セクション・重複除去・補填済み）
    └── todo.txt                ← 技術スタック別の具体的構築手順・実装チェックリスト
```

### 各ファイルの用途早見表

| ファイル | いつ参照するか |
|---|---|
| `CLAUDE.md` | 常に。すべての作業の起点 |
| `requirements.md` | コンテンツ作成・実装設計・優先順位の判断 |
| `other/article_rag.txt` | 個別トピックの原文確認・引用が必要なとき |
| `other/article_sum.txt` | MDX コンテンツ草稿を書くとき・知識の網羅確認 |
| `other/todo.txt` | 実装作業（コード・インフラ）を進めるとき |

---

## 3. カリキュラム全体像

### フェーズ構成（Phase 0〜5）

| フェーズ | 名称 | ユニット数 | 対象レベル |
|---|---|---|---|
| Phase 0 | Shopify 基礎理解 | 3 | Lv.1 |
| Phase 1 | ストア立ち上げ | 20 | Lv.1〜2 |
| Phase 2 | 日常運用 | 8 | Lv.2〜3 |
| Phase 3 | 成長・マーケティング | 9 | Lv.3 |
| Phase 4 | 拡張・高度化 | 10 | Lv.3〜4 |
| Phase 5 | 開発・カスタマイズ | 8 | Lv.5 |
| **合計** | | **51 ユニット** | |

### 難易度レベル

| Lv | 名称 | 前提スキル |
|---|---|---|
| 1 | 入門 | PC 基本操作のみ |
| 2 | 初級 | Phase 1 完了 |
| 3 | 中級 | Phase 2 完了 |
| 4 | 上級 | Phase 3 完了 |
| 5 | 専門（開発者） | HTML/CSS/JS 基礎知識 |

詳細なユニット一覧は `requirements.md` のセクション 3 を参照。

### 実装優先順位（Must → Should → Could）

- **Must（最優先）**: Phase 0〜1 全 23 ユニット。ストアを公開するために必須
- **Should**: Phase 2 全 8 ユニット + Phase 3 の P3-01・P3-05・P3-06
- **Could**: Phase 3 残り + Phase 4 前半（P4-01〜04）
- **後回し**: Phase 4 後半 + Phase 5 全体

---

## 4. 技術スタック

### システム構成

```
[ユーザー] → Google OAuth → [Supabase Auth]
                                   ↓ JWT
[Next.js (Vercel)] ←→ [Supabase PostgreSQL]（進捗・クイズ・バッジ）
                   ←→ [Supabase Storage]（画像・PDF）
                   ←→ [MDX ファイル]（ユニットコンテンツ）
```

### 採用技術

| 領域 | 技術 | 選定理由 |
|---|---|---|
| フレームワーク | Next.js 14+ (App Router) | Vercel との親和性・Server Components で DB アクセスが容易 |
| ホスティング | Vercel | Next.js の公式ホスティング・ブランチ別 Preview URL が開発で便利 |
| DB / Auth | Supabase | PostgreSQL + RLS + Auth が統合。Google OAuth がビルトイン |
| 認証 | Google OAuth 2.0 | 学習者の Google アカウントで摩擦ゼロでログイン |
| スタイリング | Tailwind CSS | ユーティリティファーストで素早く構築 |
| コンテンツ | MDX | Markdown に React コンポーネントを埋め込める。Git 管理が容易 |
| バージョン管理 | Git / GitHub | Private リポジトリ |

### 環境変数（必須）

```
NEXT_PUBLIC_SUPABASE_URL        # Supabase プロジェクト URL（クライアント用）
NEXT_PUBLIC_SUPABASE_ANON_KEY   # Supabase anon key（クライアント用）
SUPABASE_SERVICE_ROLE_KEY       # Supabase service_role key（サーバー専用・公開禁止）
```

---

## 5. データベーススキーマ（概要）

詳細な SQL は `other/todo.txt` の PART 3 に記載。

| テーブル | 用途 | 主なカラム |
|---|---|---|
| `profiles` | ユーザープロフィール | id, display_name, avatar_url, current_phase |
| `units` | ユニット定義（51 件） | id(P0-01等), phase, level, title, estimated_minutes, is_published |
| `user_progress` | 学習進捗 | user_id, unit_id, status, quiz_score, completed_at |
| `quiz_questions` | クイズ問題 | unit_id, question, options(JSONB), correct_index, explanation |
| `badges` | バッジ定義 | id, name, phase |
| `user_badges` | 取得バッジ | user_id, badge_id, earned_at |

RLS（Row Level Security）は全テーブルで有効化。
ユーザーは自分のデータのみ読み書き可能。units・quiz_questions は全認証ユーザーが参照可能。

---

## 6. ディレクトリ構成（Next.js アプリ）

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # ログインページ（Google ボタン）
│   │   └── auth/callback/route.ts  # OAuth コールバック
│   ├── (app)/                      # 認証必須エリア
│   │   ├── dashboard/page.tsx      # 進捗ダッシュボード
│   │   ├── phase/[phase]/page.tsx  # フェーズ一覧
│   │   └── unit/[unitId]/
│   │       ├── page.tsx            # ユニットコンテンツ（MDX 表示）
│   │       └── quiz/page.tsx       # クイズページ
│   └── api/
│       ├── progress/route.ts       # 進捗更新 API
│       └── quiz/submit/route.ts    # クイズ採点 API（正解は公開しない）
├── components/
│   ├── ui/                         # 汎用 UI
│   ├── learning/                   # 学習機能専用（UnitCard, QuizQuestion 等）
│   └── layout/                     # Header, Sidebar
├── lib/
│   ├── supabase/client.ts          # ブラウザ用 Supabase クライアント
│   ├── supabase/server.ts          # サーバー用 Supabase クライアント
│   └── content.ts                  # MDX ファイル読み込みユーティリティ
├── content/                        # MDX コンテンツファイル
│   ├── P0-01.mdx
│   ├── P0-02.mdx
│   └── ... （51 ファイル）
└── middleware.ts                   # 未認証リダイレクト
public/
└── images/                         # ユニット別スクリーンショット
    ├── P0-01/
    ├── P1-06/
    └── ...
```

---

## 7. 開発ワークフロー

### Git ブランチ戦略

```
main         ← 本番（Vercel 本番デプロイ）
develop      ← 統合・レビュー（Vercel Preview）
feature/*    ← 機能開発
content/*    ← コンテンツ追加
```

### コミットメッセージプレフィックス

| プレフィックス | 用途 |
|---|---|
| `feat:` | 新機能追加 |
| `fix:` | バグ修正 |
| `content:` | MDX コンテンツ追加・修正 |
| `quiz:` | クイズ問題追加・修正 |
| `style:` | スタイル変更 |
| `docs:` | ドキュメント更新 |
| `db:` | データベーススキーマ・SQL変更 |

### デプロイフロー

```
feature/xxx → PR → develop（Preview 確認）→ PR → main（本番デプロイ）
content/xxx → PR → develop（Preview 確認）→ PR → main（即時公開可）
```

コンテンツ PR は機能 PR より軽いレビューで main に取り込んでよい。
ただし MDX のビルドエラーがないことを Preview URL で必ず確認すること。

---

## 8. コンテンツ作成ガイドライン

### MDX ファイルのフロントマター（必須項目）

```yaml
---
id: "P1-06"
title: "商品登録の基本（タイトル・説明・画像・価格）"
phase: 1
level: 1
estimatedMinutes: 30
prerequisite: "P1-05"       # 前提ユニット ID。なければ省略
objectives:
  - "商品タイトルと説明文を正しく入力できる"
  - "価格・割引前価格を設定できる"
---
```

### 1 ユニットの執筆構成

1. **リード文**（このユニットで何ができるようになるか・1〜2 文）
2. **概念説明**（背景・なぜこの操作が必要か）
3. **手順解説**（見出し＋スクショ＋操作説明）
4. **ポイント / 注意事項**（ブロッククオートや箇条書きで強調）
5. **チェックリスト**（`- [ ] ...` 形式）
6. ※クイズは別ページ（quiz/page.tsx）で表示するため MDX には含めない

### 画像ファイル規則

```
格納先    : public/images/<unitId>/<unitId>-<連番>.webp
例        : public/images/P1-06/P1-06-01.webp
形式      : WebP 推奨（PNG → cwebp で変換）
解像度    : 1440×900 以上
ハイライト: 赤枠または赤矢印で操作箇所を明示
注意      : 個人情報・テスト用メールアドレスが映り込まないよう確認
```

MDX 内での参照:
```mdx
![商品登録画面](/images/P1-06/P1-06-01.webp)
```

### クイズ問題の設計原則

- 1 ユニットあたり 3〜5 問
- 種類：知識確認型・操作手順型・実務判断型をバランスよく
- 正解の解説（explanation）に「なぜそれが正しいか」を必ず書く
- 正解は API 経由でのみ返却（フロントに correct_index を渡さない）
- 投入先：Supabase の `quiz_questions` テーブルに SQL INSERT

### 合格基準

| 種別 | 合格ライン | 効果 |
|---|---|---|
| ユニット末クイズ | 70% 以上 | ユニット完了マークが付く |
| フェーズ末テスト | 80% 以上 | 次フェーズが解放・バッジ付与 |

---

## 9. 実装の大まかなステップ（フェーズ順）

### フェーズ A：基盤構築（1〜2 週間）
インフラ・認証の骨格を作る。コンテンツなしで動く状態にする。

1. GitHub リポジトリ作成・Next.js 初期化
2. Supabase プロジェクト作成（東京リージョン）
3. Google Cloud Console で OAuth クライアント作成
4. Supabase に Google Provider を設定
5. DB スキーマ作成（SQL）・RLS ポリシー・自動トリガー
6. Next.js の Supabase クライアント設定（client.ts / server.ts）
7. 認証ミドルウェア・ログインページ・コールバックルート実装
8. Vercel プロジェクト作成・環境変数設定・初回デプロイ確認

### フェーズ B：学習機能実装（2〜3 週間）
UI・API・クイズ採点など、学習体験を構成する機能を作る。

1. ダッシュボードページ（フェーズ一覧・進捗表示）
2. フェーズ一覧ページ・ユニットカード
3. ユニット詳細ページ（MDX レンダリング）
4. クイズページ（問題表示・選択・送信）
5. 進捗更新 API・クイズ採点 API（正解は server-side でのみ検証）
6. バッジ付与ロジック（フェーズ末テスト 80% 以上で発火）
7. `units` テーブルに 51 ユニット初期データ投入

### フェーズ C：コンテンツ作成（並行・継続的）
`article_sum.txt` を参照して MDX ファイルを作成する。
バッチ単位で PR を出して develop → main にマージする。

- **第 1 バッチ**（Phase 0〜1：23 ユニット）← 最優先
- **第 2 バッチ**（Phase 2〜3 前半：9 ユニット）
- **第 3 バッチ**（Phase 3 後半〜4 前半：13 ユニット）
- **第 4 バッチ**（Phase 4 後半〜5：11 ユニット）

### フェーズ D：仕上げ・公開（1 週間）
1. レスポンシブ確認（スマホ・タブレット）
2. OGP / メタデータ設定
3. エラーハンドリング・ローディング状態の実装
4. Google Cloud Console に本番 URL を追加
5. main ブランチへのデプロイ・動作確認（ログイン → 学習 → クイズ → バッジ取得の一連フロー）

---

## 10. 重要な注意事項

### セキュリティ
- `SUPABASE_SERVICE_ROLE_KEY` は **絶対に** クライアント側に渡してはいけない。
  `NEXT_PUBLIC_` プレフィックスを付けない。サーバーサイド（API Routes / Server Components）でのみ使用する。
- クイズの正解（`correct_index`）はサーバー側のみで検証し、フロントには渡さない。
- RLS を必ず有効化する。無効のままの状態でデプロイしない。

### Shopify コンテンツの鮮度
- Shopify の UI・機能は頻繁に更新される。スクリーンショットは撮影日を管理する。
- 「2026 年 9 月時点の情報」と各ユニットのリード文に明記する。
- Shopify の大きなアップデート時は該当ユニットを `content/` ブランチで修正 → PR → main で対応する。

### MDX ビルドエラーの防止
- MDX 内で `{` `}` を文字として使う場合は `\{` `\}` にエスケープする。
- 画像パスは `public/` 配下の絶対パス（`/images/...`）で指定する。
- フロントマターの YAML は必ずバリデーションしてから PR を出す。

### Vercel の無料プラン制限
- Hobby プランではサーバーレス関数タイムアウト 10 秒・月間 100GB 帯域。
- コンテンツや利用者が増えたら Pro プラン（月 $20）への移行を検討する。

### Google OAuth の URI 管理
- 新しいドメインを追加するたびに Google Cloud Console の
  「承認済みのリダイレクト URI」と「承認済みの JavaScript 生成元」を更新する。
- Vercel の Preview URL は動的に変わるため、Supabase 側のコールバック URL で吸収させる設計にする。

---

## 11. このプロジェクトの背景と方針決定の記録

| 決定事項 | 内容 | 理由 |
|---|---|---|
| 元データ処理 | HTML 生データ → RAG テキスト → サマリー → 要件定義の順で段階的に加工 | 一度にやると不備が出るため |
| コンテンツ形式 | MDX（Git 管理） | DB 管理より編集・レビューが容易。コードと一体で PR が出せる |
| 認証方式 | Google OAuth（Supabase Auth 経由） | 学習者の摩擦を最小化。メールアドレス管理が不要 |
| DB | Supabase（PostgreSQL + RLS） | Auth との統合・無料枠・日本リージョン |
| ホスティング | Vercel | Next.js との親和性・ブランチ別 Preview URL が開発に便利 |
| コンテンツ優先度 | Phase 0〜1 を最優先（Must） | ストア公開まで到達できることが最低限のユーザー価値 |
| 引用リンク | article_rag.txt に [参考記事] 形式で保持 | 将来的に「参考資料」セクションとして各ユニットに掲載できるようにするため |

---

*最終更新: 2026-09-17*

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
