# フェーズ構築ガイド — Phase 0・1 の作業を次フェーズへ汎用展開するための手引き

> このドキュメントは Phase 0・1 で実施した改善作業を整理し、Phase 2 以降でも同じ品質を維持して構築するための標準手順書です。
> Claude Code への作業依頼時にこのファイルを参照させると、一貫した実装・コンテンツ品質が得られます。

---

## 1. 実施済み作業の全体サマリー（Phase 0・1）

### コンテンツ改善（MDX ファイル）

| 対象 | 作業内容 |
|---|---|
| P0-01〜P0-03 | 長段落を分割・箇条書き・小見出しで再構成。クイズ段落を削除 |
| P0-04・P0-05 | 新規作成（国内決済手段の選定 / 法的要件と特商法表記） |
| P1-01〜P1-10 | 全 10 ファイルを P0 と同様に再構成・クイズ段落を削除 |

### インフラ改善（コード）

| 対象 | 変更内容 |
|---|---|
| `src/lib/actions/progress.ts` | Server Actions 新規作成。`getCompletedUnitIds` / `markUnitCompleted` を実装 |
| `src/components/layout/Sidebar.tsx` | `MOCK_PROGRESS` 依存を廃止。`completedIds?: string[]` の props に変更 |
| `src/app/dashboard/page.tsx` | `MOCK_PROGRESS` を Supabase 実データへ切り替え |
| `src/app/phase/[phase]/page.tsx` | 同上 |
| `src/app/unit/[unitId]/page.tsx` | 同上 + "70%以上で完了" テキストを削除 |
| `src/app/unit/[unitId]/quiz/page.tsx` | × ボタン追加・`markUnitCompleted` 呼び出し追加 |
| `supabase/schema.sql` | `profiles` / `user_progress` テーブル・RLS・自動トリガーを定義 |

---

## 2. MDX コンテンツの書き方規則（全フェーズ共通）

### 2-1. フロントマター（必須）

```yaml
---
id: "P{phase}-{連番2桁}"       # 例: P2-01
title: "ユニットタイトル"
phase: 2                         # 数値
level: 2                         # 1〜5
estimatedMinutes: 30             # 目安時間（分）
prerequisite: "P1-10"           # 前提ユニット。なければ省略
objectives:
  - "この操作ができるようになる"
  - "この概念を説明できるようになる"
---
```

### 2-2. 本文構成（3〜4 つの H2 セクション）

```
## セクション1: 背景・目的（なぜこの操作が必要か）
## セクション2: 主要概念・選択肢の比較
## セクション3: 手順 or 実践ポイント
## セクション4: 注意事項・まとめ（任意）
```

各セクションの末尾には必ず 💡 Tips を置く：

```mdx
> 💡 **実際にやってみよう:** ～～しましょう。～を確認してください。
```

### 2-3. 使ってよい Markdown 装飾

| 要素 | 使い方 | 禁止事項 |
|---|---|---|
| `<mark>...</mark>` | 最重要の一文・警告・数字 | 段落全体をハイライトしない |
| `<u>...</u>` | 補足的な注意書き・推奨事項 | 多用しない（1セクション1〜2回まで） |
| `**太字**` | 固有名詞・用語の初出・小見出し代わり | |
| `- 箇条書き` | 3 項目以上の列挙 | 2 項目以下は文中に書く |
| `1. 番号付きリスト` | 手順・ステップ | |
| `| テーブル |` | 比較・対応表（3 行以上） | |

### 2-4. 書いてはいけないこと

- **クイズ段落を本文末尾に入れない。** クイズは `quiz/page.tsx` が自動表示するため不要。
  削除対象の典型文：
  ```
  > 📝 **クイズ**（後日追加）このユニットの理解度確認クイズは近日公開予定です。
  ```
- 1 段落に複数の概念を詰め込まない。1 段落 = 1 トピックを原則とする。
- 「次のセクションでは…」「前のセクションで説明したように…」などの繋ぎ文は省く。

---

## 3. 新フェーズ適用チェックリスト

### Step 1: MDX ファイルの確認・作成

```
[ ] curriculum.ts で対象フェーズのユニット一覧を確認する
[ ] src/content/ に対応する MDX ファイルが存在するか確認する（Glob: src/content/P{N}-*.mdx）
[ ] 未作成のユニットは本ガイド §2 の規則に従って新規作成する
[ ] 作成済みファイルに「クイズ段落」が残っていれば削除する
[ ] 長段落を分割し、箇条書き・見出し・表に置き換える
[ ] 各 H2 セクション末尾に 💡 Tips ブロックがあることを確認する
[ ] quizzes.ts でそのユニットのクイズ問題が定義されているか確認する（未定義なら追加）
```

### Step 2: クイズ内容との整合確認

```
[ ] quizzes.ts の正解（correctIndex）と explanation を読む
[ ] MDX 本文中にその正解が自然な形で説明されているか確認する
    → クイズが「Aとは何か？」なら、本文でAを<mark>強調</mark>して説明する
[ ] クイズが問う概念の前提知識が本文に含まれているか確認する
```

### Step 3: インフラ確認（Phase 2 以降では基本不要）

```
[ ] src/lib/actions/progress.ts が存在し getCompletedUnitIds / markUnitCompleted が実装済みか確認
[ ] Sidebar が completedIds props を受け取る設計になっているか確認
[ ] 各ページ（dashboard / phase / unit）が MOCK_PROGRESS ではなく Supabase を使っているか確認
[ ] Supabase に user_progress テーブルと RLS が設定済みか確認
```

### Step 4: コミット・プッシュ

```
[ ] git add src/content/P{N}-*.mdx
[ ] git commit -m "content: Phase{N} MDX整形・クイズ段落削除（+ 新規ユニット追加）"
[ ] git push origin main
```

---

## 4. 重要な設計ルール（変えないこと）

### 進捗の巻き戻り防止

`markUnitCompleted` は以下の設計で進捗の劣化を防いでいます：

```typescript
// 既存レコードを先に読む
const { data: existing } = await supabase
  .from("user_progress")
  .select("quiz_score, completed_at")
  .eq("user_id", user.id)
  .eq("unit_id", unitId)
  .maybeSingle();

// スコアは最大値、完了日時は最初のものを保持
const bestScore = Math.max(quizScore, existing?.quiz_score ?? 0);
const completedAt = existing?.completed_at ?? new Date().toISOString();
```

**この実装を変えてはいけない。** クイズをやり直しても進捗が下がらない設計の根幹です。

### セキュリティルール

| ルール | 理由 |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` は絶対に `NEXT_PUBLIC_` にしない | クライアントに漏れると全データへのアクセスが可能になる |
| クイズの `correct_index` をフロントに渡さない | ブラウザの DevTools で正解が見える状態を防ぐ |
| 全テーブルに RLS を有効化する | ユーザーが他人のデータを読み書きできないようにする |

### Sidebar の completedIds パターン

Sidebar は Client Component のためサーバー側 Supabase に直接アクセスできません。
**必ず親の Server Component で `getCompletedUnitIds()` を呼び、props として渡す設計を維持する。**

```typescript
// ✅ 正しいパターン（Server Component 側）
const completedUnitIds = await getCompletedUnitIds();
return <Sidebar completedIds={completedUnitIds} />;

// ❌ やってはいけないパターン
// Sidebar 内で直接 Supabase を呼ぶ → Client Component では動作しない
```

---

## 5. フェーズ別の実施状況

| フェーズ | MDX 整形 | クイズ段落削除 | 新規ユニット作成 | インフラ対応 |
|---|---|---|---|---|
| Phase 0 (P0-01〜05) | ✅ 完了 | ✅ 完了 | ✅ P0-04・P0-05 作成済み | ✅ 完了 |
| Phase 1 (P1-01〜10) | ✅ 完了 | ✅ 完了 | — | ✅ 完了（共通インフラ） |
| Phase 2 (P2-01〜08) | ⬜ 未着手 | ⬜ 未着手 | ⬜ 未確認 | — |
| Phase 3 (P3-01〜09) | ⬜ 未着手 | ⬜ 未着手 | ⬜ 未確認 | — |
| Phase 4 (P4-01〜10) | ⬜ 未着手 | ⬜ 未着手 | ⬜ 未確認 | — |
| Phase 5 (P5-01〜08) | ⬜ 未着手 | ⬜ 未着手 | ⬜ 未確認 | — |

---

## 6. よく使うコマンド

```bash
# 対象フェーズのファイル一覧を確認
ls src/content/P2-*.mdx

# TypeScript エラーがないか確認
npx tsc --noEmit

# 開発サーバー起動（ブラウザで動作確認）
npm run dev

# コミット・プッシュ（CLAUDE.md の自動プッシュルールに従う）
git add src/content/P2-*.mdx
git commit -m "content: Phase2 MDX整形・クイズ段落削除"
git push origin main
```
