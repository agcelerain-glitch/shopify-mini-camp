"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UNITS, PHASES } from "@/data/curriculum";
import { QUIZZES } from "@/data/quizzes";
import { markUnitCompleted, getUnitProgress } from "@/lib/actions/progress";

interface ShuffledQuiz {
  options: string[];
  correctIndex: number;
}

function shuffle(options: string[], correctIndex: number): ShuffledQuiz {
  const tagged = options.map((opt, i) => ({ opt, correct: i === correctIndex }));
  for (let i = tagged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tagged[i], tagged[j]] = [tagged[j], tagged[i]];
  }
  return {
    options: tagged.map((t) => t.opt),
    correctIndex: tagged.findIndex((t) => t.correct),
  };
}

const LABELS = ["A", "B", "C", "D", "E"];

interface Props {
  unitId: string;
}

export function QuizClient({ unitId }: Props) {
  const unit = UNITS.find((u) => u.id === unitId);
  const quiz = QUIZZES.find((q) => q.unitId === unitId);
  const phaseInfo = unit ? PHASES.find((p) => p.phase === unit.phase)! : null;

  const phaseUnits = unit ? UNITS.filter((u) => u.phase === unit.phase) : [];
  const idx = unit ? phaseUnits.findIndex((u) => u.id === unitId) : -1;
  const nextUnit = idx >= 0 && idx < phaseUnits.length - 1 ? phaseUnits[idx + 1] : null;

  const [shuffled, setShuffled] = useState<ShuffledQuiz | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [prevProgress, setPrevProgress] = useState<{
    quizScore: number | null;
    completedAt: string | null;
  } | null>(null);

  useEffect(() => {
    if (quiz) setShuffled(shuffle(quiz.options, quiz.correctIndex));
  }, [quiz]);

  useEffect(() => {
    getUnitProgress(unitId).then((prog) => {
      if (prog?.status === "completed") {
        setPrevProgress({ quizScore: prog.quizScore, completedAt: prog.completedAt });
      }
    });
  }, [unitId]);

  if (!unit || !phaseInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">
        ユニットが見つかりません
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-12">
          <Link
            href={`/unit/${unitId}`}
            className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600"
          >
            ← ユニットに戻る
          </Link>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center text-amber-700">
            <p className="font-bold mb-1">クイズ準備中</p>
            <p className="text-sm">このユニットのクイズは近日公開予定です。</p>
          </div>
        </div>
      </div>
    );
  }

  if (!shuffled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
        読み込み中…
      </div>
    );
  }

  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === shuffled.correctIndex;
  // 正解したか、過去に完了済みの場合のみ先へ進める
  const canProceed = isCorrect || prevProgress !== null;

  const handleSelect = (i: number) => {
    if (isAnswered) return;
    setSelected(i);
    if (i === shuffled.correctIndex) {
      // 一発正解は 100 点・再挑戦後の正解は 50 点（サーバー側でベストスコアを保持）
      void markUnitCompleted(unitId, wrongAttempts === 0 ? 100 : 50);
    }
  };

  const handleRetry = () => {
    setWrongAttempts((n) => n + 1);
    setSelected(null);
    setShuffled(shuffle(quiz.options, quiz.correctIndex));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* パンくず */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/dashboard" className="hover:text-shopify-dark">
            ダッシュボード
          </Link>
          <span>/</span>
          <Link
            href={`/unit/${unitId}`}
            className={`font-medium hover:text-shopify-dark ${phaseInfo.textColor}`}
          >
            {unitId}
          </Link>
          <span>/</span>
          <span className="text-gray-700">ミニクイズ</span>
        </div>

        {/* 完了済みバナー */}
        {prevProgress && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            <span>✅</span>
            <span>
              このユニットは完了済みです（ベストスコア:{" "}
              <strong>{prevProgress.quizScore ?? 0}点</strong>）。
              再挑戦しても進捗・スコアは下がりません。
            </span>
          </div>
        )}

        {/* クイズカード */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          {/* ヘッダー */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`rounded-lg px-2.5 py-1 text-sm font-bold ${phaseInfo.bgColor} ${phaseInfo.textColor}`}
            >
              {unit.id}
            </span>
            <span className="text-xs font-semibold tracking-wider text-shopify-dark uppercase">
              ミニクイズ · 一問一答
            </span>
            <Link
              href={`/unit/${unitId}`}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors text-xl leading-none"
              aria-label="閉じてユニットに戻る"
              title="閉じてユニットに戻る"
            >
              ×
            </Link>
          </div>

          {/* 問題文 */}
          <p className="text-base font-bold text-gray-900 leading-relaxed mb-8">
            {quiz.question}
          </p>

          {/* 選択肢 */}
          <div className="flex flex-col gap-3">
            {shuffled.options.map((option, i) => {
              const isThisCorrect = i === shuffled.correctIndex;
              const isThisSelected = i === selected;

              let wrapClass =
                "w-full text-left rounded-xl border-2 px-5 py-4 text-sm transition-all ";
              let labelClass =
                "inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0 ";

              if (!isAnswered) {
                wrapClass +=
                  "border-gray-200 bg-white text-gray-700 hover:border-shopify hover:bg-shopify-pale cursor-pointer";
                labelClass += "bg-gray-100 text-gray-500";
              } else if (isThisCorrect) {
                wrapClass += "border-green-400 bg-green-50 text-green-800";
                labelClass += "bg-green-200 text-green-800";
              } else if (isThisSelected) {
                wrapClass += "border-red-400 bg-red-50 text-red-700";
                labelClass += "bg-red-200 text-red-700";
              } else {
                wrapClass += "border-gray-100 bg-gray-50 text-gray-400 cursor-default";
                labelClass += "bg-gray-100 text-gray-400";
              }

              return (
                <button
                  key={i}
                  className={wrapClass}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                >
                  <span className="flex items-center gap-3">
                    <span className={labelClass}>{LABELS[i]}</span>
                    <span className="leading-relaxed">{option}</span>
                    {isAnswered && isThisCorrect && (
                      <span className="ml-auto text-green-600 shrink-0">✓</span>
                    )}
                    {isAnswered && isThisSelected && !isThisCorrect && (
                      <span className="ml-auto text-red-500 shrink-0">✗</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 結果・解説 */}
          <div role="status" aria-live="polite">
            {isAnswered && (
              <div
                className={`mt-6 rounded-xl p-5 ${
                  isCorrect
                    ? "bg-green-50 border border-green-200"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                <p
                  className={`font-bold mb-2 ${
                    isCorrect ? "text-green-700" : "text-amber-700"
                  }`}
                >
                  {isCorrect
                    ? wrongAttempts === 0
                      ? "✅ 正解！ユニット完了です"
                      : "✅ 正解！ユニット完了です（再挑戦での正解）"
                    : "❌ 不正解"}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {quiz.explanation}
                </p>
                {!isCorrect && (
                  <p className="mt-3 text-sm font-medium text-amber-700">
                    解説を読んだら、教材を読み直すか、もう一度挑戦してみましょう。
                    正解するとユニット完了・次のユニットが解放されます。
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 回答後ナビゲーション */}
        {isAnswered && (
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            {!isCorrect && (
              <button
                onClick={handleRetry}
                className="flex-1 rounded-xl bg-shopify p-4 text-center text-sm font-bold text-shopify-ink hover:bg-shopify-hover transition-all shadow-sm"
              >
                🔄 もう一度挑戦する
              </button>
            )}
            <Link
              href={`/unit/${unitId}`}
              className="flex-1 rounded-xl border border-gray-200 bg-white p-4 text-center text-sm font-medium text-gray-600 hover:border-shopify hover:bg-shopify-pale transition-all"
            >
              ← 教材を読み直す
            </Link>
            {canProceed &&
              (nextUnit ? (
                <Link
                  href={`/unit/${nextUnit.id}`}
                  className={`flex-1 rounded-xl p-4 text-center text-sm font-bold transition-all shadow-sm ${
                    isCorrect
                      ? "bg-shopify text-shopify-ink hover:bg-shopify-hover"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-shopify hover:bg-shopify-pale"
                  }`}
                >
                  次のユニットへ →
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={`flex-1 rounded-xl p-4 text-center text-sm font-bold transition-all shadow-sm ${
                    isCorrect
                      ? "bg-shopify text-shopify-ink hover:bg-shopify-hover"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-shopify hover:bg-shopify-pale"
                  }`}
                >
                  ダッシュボードへ →
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
