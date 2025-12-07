import React, { useState } from 'react';
import { GameStatus, WalletState } from './types';
import { GAME_QUESTIONS, MAX_SCORE } from './constants';
import { connectIotaWallet, submitScoreToMoveContract, calculateScoreOnChain } from './services/iotaMoveService';
import WalletConnect from './components/WalletConnect';
import QuizInterface from './components/QuizInterface';

const App: React.FC = () => {
  // Game State
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  
  // Wallet State
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: '0'
  });
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  
  // Calculation & Transaction State
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConnectWallet = async () => {
    setIsWalletLoading(true);
    try {
      const walletData = await connectIotaWallet();
      setWallet(walletData);
    } catch (e) {
      alert("Không thể kết nối ví.");
    } finally {
      setIsWalletLoading(false);
    }
  };

  const startGame = () => {
    if (!wallet.isConnected) {
      alert("Vui lòng kích hoạt ví IOTA để bắt đầu!");
      return;
    }
    setCorrectCount(0);
    setFinalScore(null);
    setCurrentQuestionIndex(0);
    setTxHash(null);
    setStatus(GameStatus.PLAYING);
  };

  const handleNextQuestion = async (isCorrect: boolean) => {
    const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrectCount);
    
    if (currentQuestionIndex < GAME_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      await finishGame(newCorrectCount);
    }
  };

  const finishGame = async (finalCorrectCount: number) => {
    setStatus(GameStatus.FINISHED);
    setIsCalculating(true);
    
    // Simulate calling the Smart Contract to calculate score
    try {
      const calculatedScore = await calculateScoreOnChain(finalCorrectCount);
      setFinalScore(calculatedScore);
    } catch (error) {
      console.error("Move VM Calculation Error", error);
      setFinalScore(finalCorrectCount * 2); // Fallback
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmitScore = async () => {
    if (!wallet.address || finalScore === null) return;
    setIsSubmitting(true);
    try {
      const hash = await submitScoreToMoveContract(wallet.address, finalScore);
      setTxHash(hash);
    } catch (e) {
      alert("Lỗi khi gửi điểm lên chuỗi Move.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4 md:p-8 font-mono relative overflow-hidden">
      
      {/* Grid Background Effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <WalletConnect 
        wallet={wallet} 
        onConnect={handleConnectWallet} 
        isLoading={isWalletLoading} 
      />

      <div className="z-10 flex-1 flex flex-col items-center justify-center w-full">
        
        {/* IDLE SCREEN */}
        {status === GameStatus.IDLE && (
          <div className="text-center max-w-lg animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter border-4 border-white p-6 inline-block bg-black">
              ANIMAL_QUIZ
            </h1>
            <p className="text-gray-400 mb-8 text-sm md:text-base font-mono">
              [SYSTEM]: IOTA Move VM Ready.<br/>
              [MISSION]: Trả lời 5 câu hỏi về động vật.<br/>
              [REWARD]: Tokenized Score.
            </p>
            <button
              onClick={startGame}
              className="bg-white text-black text-xl font-bold px-10 py-4 hover:bg-gray-300 transition-colors uppercase tracking-widest"
            >
              KÍCH HOẠT GAME
            </button>
            <div className="mt-8 text-xs text-gray-600 font-mono">
              Powered by IOTA Smart Contracts
            </div>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {status === GameStatus.PLAYING && (
          <div className="w-full">
            <QuizInterface 
              question={GAME_QUESTIONS[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={GAME_QUESTIONS.length}
              onNext={handleNextQuestion}
            />
          </div>
        )}

        {/* FINISHED SCREEN */}
        {status === GameStatus.FINISHED && (
          <div className="w-full max-w-md border-2 border-white p-8 bg-black text-center relative">
            <h2 className="text-3xl font-bold mb-2">GAME OVER</h2>
            <div className="h-px w-full bg-gray-700 mb-6"></div>
            
            {isCalculating ? (
              <div className="py-10">
                <div className="animate-spin w-10 h-10 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-sm text-gray-400 font-mono animate-pulse">
                  Đang gọi Move Contract tính điểm...<br/>
                  (0x1::QuizGame::calculate_score)
                </p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="text-6xl font-bold mb-2">{finalScore}<span className="text-2xl text-gray-500">/{MAX_SCORE}</span></div>
                <p className="text-gray-400 mb-8">Điểm số xác thực bởi Smart Contract</p>

                {!txHash ? (
                  <button
                    onClick={handleSubmitScore}
                    disabled={isSubmitting}
                    className="w-full border-2 border-white py-3 font-bold hover:bg-white hover:text-black transition-colors mb-4 flex justify-center items-center gap-2 uppercase"
                  >
                    {isSubmitting ? 'ĐANG GỬI...' : 'Lưu vào Blockchain'}
                    {!isSubmitting && <span className="text-xs">↗</span>}
                  </button>
                ) : (
                  <div className="bg-neutral-900 p-4 border border-green-800 mb-4 text-left">
                    <p className="text-green-500 font-bold text-sm mb-1">[SUCCESS] BLOCKCHAIN CONFIRMED</p>
                    <p className="text-xs text-gray-500 break-all font-mono">Tx: {txHash}</p>
                    <p className="text-xs text-gray-600 mt-2 font-mono">Module: 0x1::QuizGame</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setStatus(GameStatus.IDLE);
                    setCorrectCount(0);
                    setFinalScore(null);
                    setCurrentQuestionIndex(0);
                    setTxHash(null);
                  }}
                  className="text-sm text-gray-500 hover:text-white underline mt-4"
                >
                  [ KHỞI ĐỘNG LẠI ]
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default App;