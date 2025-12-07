import React, { useState, useEffect } from 'react';
import { Question, AnswerStatus } from '../types';
import { getAnimalFunFact } from '../services/geminiService';

interface QuizInterfaceProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onNext: (isCorrect: boolean) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ 
  question, 
  questionIndex, 
  totalQuestions, 
  onNext 
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<AnswerStatus>(AnswerStatus.UNANSWERED);
  const [funFact, setFunFact] = useState<string>('');
  const [isLoadingFact, setIsLoadingFact] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setUserAnswer('');
    setStatus(AnswerStatus.UNANSWERED);
    setFunFact('');
  }, [question]);

  const handleGuess = async () => {
    if (!userAnswer.trim()) return;

    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = question.correctAnswer.toLowerCase();

    // Check strict equality for "chim", "cá", etc.
    if (normalizedUser === normalizedCorrect) {
      setStatus(AnswerStatus.CORRECT);
      fetchFunFact();
    } else {
      setStatus(AnswerStatus.INCORRECT);
      fetchFunFact();
    }
  };

  const fetchFunFact = async () => {
    setIsLoadingFact(true);
    const fact = await getAnimalFunFact(question.hintKey);
    setFunFact(fact);
    setIsLoadingFact(false);
  };

  const handleNextClick = () => {
    onNext(status === AnswerStatus.CORRECT);
  };

  const isAnswered = status !== AnswerStatus.UNANSWERED;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 border-4 border-white bg-black relative">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <span className="text-gray-400 font-bold font-mono">Q-{questionIndex + 1}/{totalQuestions}</span>
        <span className="text-xs uppercase tracking-widest text-gray-600 font-mono">
          {status === AnswerStatus.UNANSWERED ? 'WAITING FOR INPUT' : status}
        </span>
      </div>

      {/* Question */}
      <div className="mb-10">
        <h2 className="text-xl md:text-2xl leading-relaxed font-bold text-white mb-6">
          {question.questionText}
        </h2>
        
        {/* Input Area */}
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isAnswered}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isAnswered) handleGuess();
            }}
            placeholder="Nhập đáp án..."
            className={`
              flex-1 bg-transparent border-2 border-gray-600 p-4 text-lg outline-none font-mono
              focus:border-white transition-colors
              ${isAnswered ? 'opacity-50 cursor-not-allowed text-gray-500' : 'text-white'}
            `}
          />
          {!isAnswered && (
            <button 
              onClick={handleGuess}
              className="bg-white text-black px-8 py-4 font-bold uppercase hover:bg-gray-200 active:scale-95 transition-transform tracking-wider"
            >
              Guess
            </button>
          )}
        </div>
      </div>

      {/* Feedback Section */}
      {isAnswered && (
        <div className={`
          border-l-4 p-6 mb-6 animate-fade-in
          ${status === AnswerStatus.CORRECT ? 'border-white bg-neutral-900' : 'border-gray-600 bg-neutral-900'}
        `}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-3 h-3 ${status === AnswerStatus.CORRECT ? 'bg-white' : 'bg-transparent border border-white'}`}></div>
            <h3 className="font-bold text-lg uppercase">
              {status === AnswerStatus.CORRECT ? 'Chính xác (+2 Điểm)' : 'Sai rồi'}
            </h3>
          </div>
          
          {status === AnswerStatus.INCORRECT && (
            <p className="text-gray-300 mb-2 font-mono text-sm">
              ĐÁP ÁN ĐÚNG: <span className="font-bold text-white underline">{question.correctAnswer}</span>
            </p>
          )}

          {/* AI Fun Fact */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <span className="text-[10px] text-gray-500 uppercase font-bold mb-1 block tracking-widest">Gemini AI Knowledge Base:</span>
            {isLoadingFact ? (
              <span className="animate-pulse text-gray-500 text-sm font-mono">...decrypting...</span>
            ) : (
              <p className="text-sm text-gray-300 italic font-mono">"{funFact}"</p>
            )}
          </div>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-end mt-6">
          <button 
            onClick={handleNextClick}
            className="flex items-center gap-2 border border-white px-6 py-3 text-white hover:bg-white hover:text-black font-bold uppercase tracking-wide group transition-all"
          >
            {questionIndex + 1 === totalQuestions ? 'Hoàn thành' : 'Câu tiếp theo'}
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;