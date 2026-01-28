
import React, { useState } from 'react';
import { QUIZ_DATA } from '../constants';
import { CheckCircle2, XCircle, ChevronRight, RefreshCw, Trophy } from 'lucide-react';

const Quiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUIZ_DATA[currentIndex];

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    if (idx === currentQuestion.answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < QUIZ_DATA.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="text-center py-12 space-y-8 animate-fadeIn">
        <div className="inline-block p-8 bg-yellow-100 rounded-full animate-bounce shadow-inner">
          <Trophy size={80} className="text-yellow-600" />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic">미션 완료!</h2>
          <p className="text-xl text-slate-600 font-bold leading-relaxed">
            축하해요! 여러분의 점수는 <span className="text-[#4A90E2] font-black">{score} / {QUIZ_DATA.length}</span>점입니다!<br/>
            {score === QUIZ_DATA.length 
              ? '와~ 부산에 대해서 정말 잘 아시네요! 최고의 장소들을 이미 꿰뚫고 계시군요!' 
              : '정말 잘하셨어요! 조금만 더 알아보면 완벽한 부산 전문가가 될 수 있을 거예요!'}
          </p>
        </div>
        <button 
          onClick={reset}
          className="bg-[#4A90E2] text-white px-10 py-5 rounded-[32px] font-black flex items-center gap-3 mx-auto hover:bg-[#357ABD] transition-all shadow-2xl active:scale-95 text-lg"
        >
          <RefreshCw size={24} /> 다시 도전해 볼까요?
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-slate-100 h-3 w-full rounded-full overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-[#4A90E2] to-[#357ABD] h-full transition-all duration-700" 
          style={{ width: `${((currentIndex + 1) / QUIZ_DATA.length) * 100}%` }}
        ></div>
      </div>

      <div className="space-y-4">
        <span className="text-[#4A90E2] font-black text-sm uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">Challenge {currentIndex + 1}</span>
        <h3 className="text-2xl font-black leading-snug text-slate-800 tracking-tight">
          {currentQuestion.question}
        </h3>
      </div>

      <div className="space-y-4">
        {currentQuestion.options.map((opt, i) => {
          const isSelected = selectedOption === i;
          const isCorrect = i === currentQuestion.answer;
          let bgColor = 'bg-white border-slate-100 shadow-sm';
          if (selectedOption !== null) {
            if (isCorrect) bgColor = 'bg-green-50 border-green-500 ring-4 ring-green-100';
            else if (isSelected) bgColor = 'bg-red-50 border-red-500 ring-4 ring-red-100';
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selectedOption !== null}
              className={`w-full p-6 rounded-[32px] border-2 text-left transition-all flex items-center justify-between group ${bgColor} ${selectedOption === null ? 'hover:border-[#4A90E2] hover:translate-x-2' : ''}`}
            >
              <span className={`font-black ${selectedOption === null ? 'text-slate-600 group-hover:text-[#4A90E2]' : 'text-slate-700'} text-lg`}>{opt}</span>
              {selectedOption !== null && isCorrect && <CheckCircle2 className="text-green-600" size={28} />}
              {selectedOption !== null && isSelected && !isCorrect && <XCircle className="text-red-600" size={28} />}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="bg-blue-50/50 p-8 rounded-[48px] animate-slideUp border border-blue-100 shadow-lg mt-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#4A90E2] p-2.5 rounded-2xl text-white font-black text-xs shrink-0 shadow-lg">부기의 조언</div>
            <p className="text-base text-slate-700 font-bold leading-relaxed italic">
              "{currentQuestion.explanation}"
            </p>
          </div>
          <button 
            onClick={nextQuestion}
            className="w-full mt-10 bg-slate-900 text-white py-5 rounded-[28px] font-black flex items-center justify-center gap-2 hover:bg-black transition-all shadow-2xl active:scale-95 text-lg"
          >
            {currentIndex === QUIZ_DATA.length - 1 ? '결과 확인하기' : '다음 문제로 가볼까요?'} <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
