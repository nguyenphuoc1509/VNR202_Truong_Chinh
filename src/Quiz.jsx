import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  BookOpen,
} from "lucide-react";

// ==========================
// DATA: CÂU HỎI QUIZ
// ==========================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Tên thật của Trường Chinh là gì?",
    options: ["Đặng Xuân Khu", "Nguyễn Văn Cừ", "Hồ Chí Minh", "Lê Duẩn"],
    correctAnswer: 0,
    explanation:
      "Tên thật của Trường Chinh là Đặng Xuân Khu, sinh ngày 9/2/1907 tại Hành Thiện, Nam Định.",
    anchorSection: "#than-the",
    anchorLabel: "Xem lại phần Thân thế & Quê quán",
  },
  {
    id: 2,
    question: "Trường Chinh giữ chức Tổng Bí thư lần đầu tiên vào năm nào?",
    options: ["1930", "1940", "1945", "1951"],
    correctAnswer: 1,
    explanation:
      "Trường Chinh được bầu làm Tổng Bí thư lần đầu vào tháng 11/1940 tại Trung ương 7, thay thế Nguyễn Văn Cừ.",
    anchorSection: "#lanh-dao",
    anchorLabel: "Xem lại phần Trở thành lãnh đạo chủ chốt",
  },
  {
    id: 3,
    question: "Bút danh 'Trường Chinh' xuất hiện lần đầu vào thời gian nào?",
    options: ["10/10/1942", "19/8/1945", "2/9/1945", "7/5/1954"],
    correctAnswer: 0,
    explanation:
      "Bút danh 'Trường Chinh' xuất hiện lần đầu vào ngày 10/10/1942 khi ông làm Chủ bút báo Cờ Giải phóng.",
    anchorSection: "#cach-mang",
    anchorLabel: "Xem lại phần Con đường hoạt động cách mạng",
  },
  {
    id: 4,
    question:
      "Trường Chinh giữ chức Chủ tịch Quốc hội trong khoảng thời gian nào?",
    options: ["1954-1975", "1960-1981", "1976-1986", "1981-1987"],
    correctAnswer: 1,
    explanation:
      "Trường Chinh giữ chức Chủ tịch Quốc hội từ năm 1960 đến năm 1981, sau đó làm Chủ tịch Hội đồng Nhà nước (1981-1987).",
    anchorSection: "#nhung-nam",
    anchorLabel: "Xem lại phần Những năm tiếp theo",
  },
  {
    id: 5,
    question:
      "Trường Chinh đóng vai trò quan trọng trong sự kiện lịch sử nào vào năm 1986?",
    options: [
      "Chiến thắng Điện Biên Phủ",
      "Giải phóng miền Nam",
      "Đổi mới (Đại hội VI)",
      "Cải cách ruộng đất",
    ],
    correctAnswer: 2,
    explanation:
      "Năm 1986, Trường Chinh đóng vai trò then chốt trong việc mở đường cho Đổi mới tại Đại hội VI, được gọi là 'Tổng Bí thư của Đổi mới'.",
    anchorSection: "#doi-moi",
    anchorLabel: "Xem lại phần Trường Chinh và Đổi mới",
  },
];

// ==========================
// THEME
// ==========================
function QuizThemeStyles() {
  return (
    <style>{`
      :root {
        --bg-start: #0b0c10;
        --bg-mid: #0b0a0a;
        --bg-end: #050507;
        --panel: rgba(255,255,255,0.05);
        --border: rgba(255,255,255,0.08);
        --muted: rgba(255,255,255,0.78);
        --accent: #f59e0b;
        --accent-2: #ef4444;
        --accent-3: #facc15;
      }
    `}</style>
  );
}

// ==========================
// QUIZ PAGE
// ==========================
export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestion];
  const isAnswered = answeredQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;
  const allCorrect = score === QUIZ_QUESTIONS.length;

  const handleAnswerSelect = (answerIndex) => {
    if (answeredQuestions[currentQuestion]) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const question = QUIZ_QUESTIONS[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion]: {
        selected: selectedAnswer,
        correct: isCorrect,
      },
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions({});
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--bg-start)] via-[var(--bg-mid)] to-[var(--bg-end)] text-white">
      <QuizThemeStyles />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur border-b border-white/10 bg-[rgba(10,10,10,0.4)]">
        <nav className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] rounded-xl"
            >
              <ArrowLeft size={20} />
              <span className="text-white font-bold tracking-wide">
                Về trang chủ
              </span>
            </Link>
            <div className="flex items-center gap-2 text-white/80 font-semibold">
              <BookOpen size={18} className="text-[var(--accent-3)]" />
              <span>Hành trình học tập</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Checkpoint nhỏ trên đầu */}
          <div className="mb-6 flex flex-wrap gap-2">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const done = !!answeredQuestions[idx];
              const correct = answeredQuestions[idx]?.correct;
              return (
                <div
                  key={q.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${idx === currentQuestion
                      ? "border-[var(--accent-3)] bg-[var(--accent-3)]/20"
                      : "border-white/20 bg-white/5"
                    } ${done && correct
                      ? "ring-2 ring-green-400/70"
                      : done && !correct
                        ? "ring-2 ring-red-400/70"
                        : ""
                    }`}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>

          {!showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">
                    Bước {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-white/80 text-sm">
                    Điểm: {score} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-3)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                  Câu hỏi {currentQuestion + 1}
                </h2>
                <p className="text-white/70 text-sm mb-4">
                  Bước nhỏ trong hành trình khám phá cuộc đời và tư tưởng Trường
                  Chinh.
                </p>

                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white">
                  {currentQ.question}
                </h3>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQ.correctAnswer;
                    const wasSelected = isAnswered?.selected === index;
                    const showCorrect = showExplanation && isCorrect;
                    const showIncorrect =
                      showExplanation && wasSelected && !isCorrect;

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${showCorrect
                            ? "bg-green-500/20 border-green-500"
                            : showIncorrect
                              ? "bg-red-500/20 border-red-500"
                              : isSelected
                                ? "bg-[var(--accent)]/20 border-[var(--accent)]"
                                : "bg-white/5 border-white/10 hover:border-white/20"
                          } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${showCorrect
                                ? "bg-green-500 text-white"
                                : showIncorrect
                                  ? "bg-red-500 text-white"
                                  : isSelected
                                    ? "bg-[var(--accent)] text-white"
                                    : "bg-white/10 text-white/80"
                              }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="flex-1 text-white/90">
                            {option}
                          </span>
                          {showCorrect && (
                            <CheckCircle2
                              className="text-green-500"
                              size={20}
                            />
                          )}
                          {showIncorrect && (
                            <XCircle className="text-red-500" size={20} />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation + link về section tương ứng */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 space-y-3"
                    >
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <p className="text-blue-300 text-sm md:text-base">
                          <strong>Giải thích:</strong> {currentQ.explanation}
                        </p>
                      </div>

                      {currentQ.anchorSection && (
                        <a
                          href={currentQ.anchorSection}
                          className="inline-flex items-center gap-2 text-[var(--accent-3)] text-sm hover:underline underline-offset-4"
                        >
                          <BookOpen size={16} />
                          <span>{currentQ.anchorLabel}</span>
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                {!showExplanation ? (
                  <motion.button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-6 py-3 rounded-xl font-semibold ${selectedAnswer === null
                        ? "bg-white/10 text-white/40 cursor-not-allowed"
                        : "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
                      }`}
                    whileHover={
                      selectedAnswer !== null ? { scale: 1.05 } : {}
                    }
                    whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
                  >
                    Xác nhận
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentQuestion < QUIZ_QUESTIONS.length - 1
                      ? "Bước tiếp theo"
                      : "Hoàn thành hành trình"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
                {/* Badge / Huy hiệu */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6 flex flex-col items-center gap-2"
                >
                  <Trophy
                    size={80}
                    className={`${allCorrect
                        ? "text-[var(--accent-3)]"
                        : score >= QUIZ_QUESTIONS.length * 0.7
                          ? "text-[var(--accent)]"
                          : "text-white/60"
                      }`}
                  />
                  <span className="text-sm uppercase tracking-widest text-white/70">
                    Hành trình học tập
                  </span>
                  {allCorrect && (
                    <span className="px-3 py-1 rounded-full bg-[var(--accent-3)]/20 text-[var(--accent-3)] text-xs font-semibold">
                      Huy hiệu “Nhà sử học trẻ về Trường Chinh”
                    </span>
                  )}
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bạn đã hoàn thành!
                </h2>

                <div className="mb-8">
                  <p className="text-2xl md:text-3xl font-bold text-[var(--accent)] mb-2">
                    {score} / {QUIZ_QUESTIONS.length}
                  </p>
                  <p className="text-white/80 text-lg">
                    {allCorrect
                      ? "Xuất sắc! Bạn đã nắm rất tốt hành trình cuộc đời và tư tưởng của Trường Chinh. 🎉"
                      : score >= QUIZ_QUESTIONS.length * 0.7
                        ? "Tốt lắm! Bạn đã có nền tảng vững về Trường Chinh, hãy thử lại để đạt huy hiệu cao nhất! 👍"
                        : "Không sao, hành trình học tập luôn có thể bắt đầu lại. Hãy xem lại các phần tương ứng trên trang chính và thử lại nhé! 💪"}
                  </p>
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                  <motion.button
                    onClick={handleRestart}
                    className="px-6 py-3 rounded-xl font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw size={20} />
                    Làm lại hành trình
                  </motion.button>
                  <Link to="/">
                    <motion.button
                      className="px-6 py-3 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft size={20} />
                      Về trang chủ
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
