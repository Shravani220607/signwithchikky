import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Trophy,
  BookOpen,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Sign, Topic } from '../../types/sign';

interface QuizEngineProps {
  signs: Sign[];
  topics: Topic[];
  initialTopicSlug?: string;
  onNavigateSign?: (slug: string) => void;
}

type QuestionType = 'char-to-name' | 'hand-to-char' | 'matching';

interface QuizQuestion {
  id: string;
  type: QuestionType;
  targetSign: Sign;
  prompt: string;
  options: {
    id: string;
    text: string;
    subtitle?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  signs,
  topics,
  initialTopicSlug,
  onNavigateSign
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopicSlug || 'all');
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (initialTopicSlug) {
      setSelectedTopic(initialTopicSlug);
      setQuizStarted(false);
    }
  }, [initialTopicSlug]);

  // Topic list with real counts
  const availableTopics = useMemo(() => {
    return topics.map((t) => {
      const count = signs.filter((s) => s.topics.some((top) => top.toLowerCase() === t.title.toLowerCase())).length;
      return {
        slug: t.slug,
        title: t.title,
        description: t.description,
        count
      };
    });
  }, [topics, signs]);

  // Filter pool for active quiz
  const pool = useMemo(() => {
    if (selectedTopic === 'all') return signs;
    return signs.filter((s) =>
      s.topics.some(
        (t) =>
          t.toLowerCase() === selectedTopic.toLowerCase() ||
          t.toLowerCase().replace(/\s+/g, '-') === selectedTopic.toLowerCase()
      )
    );
  }, [signs, selectedTopic]);

  if (signs.length < 2) {
    return (
      <div className="py-24 text-center bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shadow-inner">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
          No quizzes available yet.
        </h2>
        <p className="text-sm text-[#374151] max-w-md mx-auto leading-relaxed">
          Quizzes will automatically activate once signs are added to the Indian Sign Language curriculum.
        </p>
      </div>
    );
  }

  // Generate Questions exclusively from signs in this quiz pool
  const generateQuiz = (topicSlug: string) => {
    setSelectedTopic(topicSlug);
    let targetPool = signs;
    if (topicSlug !== 'all') {
      targetPool = signs.filter((s) =>
        s.topics.some(
          (t) =>
            t.toLowerCase() === topicSlug.toLowerCase() ||
            t.toLowerCase().replace(/\s+/g, '-') === topicSlug.toLowerCase()
        )
      );
      if (targetPool.length < 2) {
        targetPool = signs;
      }
    }

    const shuffledSigns = [...targetPool].sort(() => 0.5 - Math.random());
    const selectedBatch = shuffledSigns.slice(0, Math.min(6, shuffledSigns.length));

    const generated: QuizQuestion[] = selectedBatch.map((target, idx) => {
      const qTypes: QuestionType[] = ['char-to-name', 'hand-to-char', 'matching'];
      const qType = qTypes[idx % qTypes.length];

      const distractors = targetPool
        .filter((s) => s.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      if (qType === 'char-to-name') {
        const allOpts = [target, ...distractors].sort(() => 0.5 - Math.random());
        return {
          id: `q-${idx}`,
          type: 'char-to-name',
          targetSign: target,
          prompt: `Which Indian Sign Language character represents "${target.name}"?`,
          options: allOpts.map((opt) => ({
            id: opt.id,
            text: opt.word,
            subtitle: opt.name,
            isCorrect: opt.id === target.id
          })),
          explanation: `Correct: "${target.word}" is ${target.name}. ${target.howToSign.summary}`
        };
      } else if (qType === 'hand-to-char') {
        const allOpts = [target, ...distractors].sort(() => 0.5 - Math.random());
        return {
          id: `q-${idx}`,
          type: 'hand-to-char',
          targetSign: target,
          prompt: `Which handshape is used to sign "${target.word}" (${target.name}) in ISL?`,
          options: allOpts.map((opt) => ({
            id: opt.id,
            text: opt.howToSign.dominantHand,
            subtitle: opt.handsUsed,
            isCorrect: opt.id === target.id
          })),
          explanation: `For "${target.word}": ${target.howToSign.dominantHand}. ${target.howToSign.summary}`
        };
      } else {
        const allOpts = [target, ...distractors].sort(() => 0.5 - Math.random());
        return {
          id: `q-${idx}`,
          type: 'matching',
          targetSign: target,
          prompt: `Identify the correct meaning of sign ID ${target.id}:`,
          options: allOpts.map((opt) => ({
            id: opt.id,
            text: `${opt.name} (${opt.word})`,
            subtitle: `Topics: ${opt.topics.join(', ')}`,
            isCorrect: opt.id === target.id
          })),
          explanation: `${target.id} corresponds to "${target.name}" (${target.word}) in topics: ${target.topics.join(', ')}.`
        };
      }
    });

    setQuestions(generated);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsAnswerSubmitted(false);
    setQuizCompleted(false);
    setQuizStarted(true);
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optId
    }));
  };

  const handleSubmitAnswer = () => {
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      calculateScoreAndCelebrate();
    }
  };

  const calculateScoreAndCelebrate = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selected === correctOpt?.id) {
        correct++;
      }
    });
    const percent = Math.round((correct / questions.length) * 100);
    if (percent >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const currentQ = questions[currentQuestionIndex];
  const hasAnsweredCurrent = userAnswers[currentQuestionIndex] !== undefined;
  const correctCount = questions.filter((q, idx) => {
    const selected = userAnswers[idx];
    const correctOpt = q.options.find((o) => o.isCorrect);
    return selected === correctOpt?.id;
  }).length;
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {!quizStarted ? (
        <div className="space-y-8">
          {/* Header intro */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
              Indian Sign Language Practice Quizzes
            </h2>
            <p className="text-[#374151] text-sm max-w-xl mx-auto leading-relaxed">
              Verify your recognition of signs, fingerspelling shapes, and meanings. Choose a specific topic quiz or test yourself with a comprehensive mixed quiz.
            </p>
          </div>

          {/* TWO MODES: 1. MIXED QUIZ & 2. TOPIC QUIZ CARDS */}
          <div className="space-y-6">
            {/* Mode 1: Mixed Quiz Card */}
            <div className="bg-white rounded-3xl border-2 border-neutral-200 p-6 sm:p-8 hover:border-[#DC2626] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DC2626] bg-[#FEE2E2] px-2.5 py-0.5 rounded">
                    Mode 1 • Comprehensive
                  </span>
                  <span className="text-xs font-mono text-[#374151] font-bold">
                    6 Questions
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  Mixed Quiz (All Signs)
                </h3>
                <p className="text-xs text-[#374151] max-w-lg">
                  Questions selected at random from the entire Indian Sign Language dictionary across Alphabets, Numbers, and Vocabulary.
                </p>
              </div>
              <button
                type="button"
                onClick={() => generateQuiz('all')}
                className="px-6 py-3 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 active:scale-95"
              >
                <span>Start Mixed Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mode 2: Topic Quiz Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#DC2626]" />
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  Topic Quizzes
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  (Questions generated only from that topic)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableTopics.map((topicItem) => (
                  <div
                    key={topicItem.slug}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-[#DC2626] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[#DC2626] font-bold text-[10px] bg-[#FEE2E2] px-2 py-0.5 rounded">
                          Topic
                        </span>
                        <span className="font-mono text-xs font-bold text-[#374151]">
                          {topicItem.count} Signs
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-[#1A1A1A]">
                        {topicItem.title} Quiz
                      </h4>
                      <p className="text-xs text-[#374151] line-clamp-2">
                        {topicItem.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-neutral-500">
                        {Math.min(6, Math.max(2, topicItem.count))} Questions
                      </span>
                      <button
                        type="button"
                        onClick={() => generateQuiz(topicItem.slug)}
                        disabled={topicItem.count < 2}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          topicItem.count >= 2
                            ? 'bg-[#DC2626] hover:bg-[#EF4444] text-white shadow-xs active:scale-95'
                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : quizCompleted ? (
        /* Quiz Completed Screen */
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 rounded-full bg-[#FEE2E2] text-[#DC2626] mb-2">
              <Award className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-[#1A1A1A]">
              Quiz Completed!
            </h2>
            <p className="text-sm text-[#374151]">
              Performance breakdown for this Indian Sign Language practice session.
            </p>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 text-center">
              <span className="text-xs font-mono uppercase text-[#374151] font-bold">
                Overall Score
              </span>
              <p className="text-3xl font-black text-[#DC2626] mt-1 font-mono">
                {scorePercent}%
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 text-center">
              <span className="text-xs font-mono uppercase text-[#374151] font-bold">
                Correct Answers
              </span>
              <p className="text-3xl font-black text-[#1A1A1A] mt-1 font-mono">
                {correctCount} / {questions.length}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-neutral-200 text-center">
              <span className="text-xs font-mono uppercase text-[#374151] font-bold">
                Review Needed
              </span>
              <p className="text-3xl font-black text-[#7F1D1D] mt-1 font-mono">
                {questions.length - correctCount}
              </p>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <h3 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#DC2626]" />
              <span>Review Answers & Explanations</span>
            </h3>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const selectedOptId = userAnswers[idx];
                const selectedOpt = q.options.find((o) => o.id === selectedOptId);
                const correctOpt = q.options.find((o) => o.isCorrect);
                const isCorrect = selectedOptId === correctOpt?.id;
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border text-sm transition-all ${
                      isCorrect
                        ? 'border-neutral-200 bg-[#FAFAFA]'
                        : 'border-[#FECDD3] bg-[#FEE2E2]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[#7F1D1D] shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                            <span>Question {idx + 1}: {q.targetSign.name}</span>
                          </div>
                          <p className="text-xs text-[#374151] mt-1">{q.prompt}</p>
                          <div className="mt-2 text-xs space-y-1">
                            <div>
                              <span className="font-semibold text-[#374151]">Your Answer: </span>
                              <span className={isCorrect ? 'text-[#DC2626] font-bold' : 'text-[#7F1D1D] line-through font-bold'}>
                                {selectedOpt ? selectedOpt.text : 'Not answered'}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="font-semibold text-[#374151]">Correct Answer: </span>
                                <span className="text-[#DC2626] font-bold">
                                  {correctOpt?.text}
                                </span>
                              </div>
                            )}
                            <p className="text-[#374151] mt-1 pt-1 border-t border-neutral-200">
                              {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                      {onNavigateSign && (
                        <button
                          type="button"
                          onClick={() => onNavigateSign(q.targetSign.slug)}
                          className="shrink-0 text-xs font-bold text-[#DC2626] hover:text-[#EF4444] hover:underline flex items-center gap-1"
                        >
                          <span>Dictionary</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => generateQuiz(selectedTopic)}
              className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <button
              type="button"
              onClick={() => setQuizStarted(false)}
              className="px-6 py-2.5 rounded-xl border border-neutral-300 text-[#1A1A1A] text-xs font-bold hover:bg-neutral-100 transition-colors"
            >
              Choose Another Quiz
            </button>
          </div>
        </div>
      ) : (
        /* Active Quiz Question Screen */
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#DC2626] uppercase">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-xs text-[#374151] font-medium">
                Topic: {currentQ.targetSign.topics[0]}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    idx === currentQuestionIndex
                      ? 'bg-[#DC2626] w-8'
                      : idx < currentQuestionIndex
                      ? 'bg-neutral-800'
                      : 'bg-neutral-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              {currentQ.prompt}
            </h3>
            {currentQ.type === 'char-to-name' && (
              <div className="py-2 text-center">
                <span className="inline-block px-6 py-3 rounded-2xl bg-[#FEE2E2] text-[#DC2626] font-bold text-lg font-mono">
                  {currentQ.targetSign.name}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = userAnswers[currentQuestionIndex] === opt.id;
              const showResult = isAnswerSubmitted;
              const isCorrect = opt.isCorrect;

              let style =
                'border-neutral-200 hover:border-[#DC2626] bg-[#FAFAFA] text-[#1A1A1A]';
              if (isSelected && !showResult) {
                style =
                  'border-[#DC2626] bg-[#FEE2E2] text-[#1A1A1A] ring-2 ring-[#DC2626]/20 font-bold';
              } else if (showResult) {
                if (isCorrect) {
                  style =
                    'border-[#DC2626] bg-[#FEE2E2] text-[#1A1A1A] font-bold';
                } else if (isSelected && !isCorrect) {
                  style =
                    'border-[#7F1D1D] bg-neutral-100 text-[#7F1D1D]';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${style}`}
                >
                  <div>
                    <span className="text-sm font-semibold">{opt.text}</span>
                    {opt.subtitle && (
                      <span className="block text-xs text-[#374151] mt-0.5">
                        {opt.subtitle}
                      </span>
                    )}
                  </div>
                  {showResult && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-[#DC2626] shrink-0 ml-2" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-[#7F1D1D] shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-[#FEE2E2] border border-[#FECDD3] text-xs text-[#1A1A1A]">
              <span className="font-bold text-[#DC2626] block mb-0.5">
                ISL Knowledge Note:
              </span>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <span className="text-xs text-[#374151] font-mono">
              Sign ID: {currentQ.targetSign.id}
            </span>
            <div className="flex items-center gap-2">
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={!hasAnsweredCurrent}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    hasAnsweredCurrent
                      ? 'bg-[#DC2626] hover:bg-[#EF4444] text-white active:scale-95 shadow-xs'
                      : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-xs"
                >
                  <span>
                    {currentQuestionIndex + 1 === questions.length ? 'View Results' : 'Next Question'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
