/* 
  MÔ PHỎNG TƯƠNG TÁC VỚI SMART CONTRACT MOVE
  
  File mã nguồn hợp đồng thực tế nằm tại:
  -> move/sources/quiz_game.move
  
  Module: 0xCAFE::animal_quiz
  Function: calculate_score & submit_score
*/

import { WalletState } from "../types";

// Giả lập độ trễ mạng
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const connectIotaWallet = async (): Promise<WalletState> => {
  // Ở môi trường thật, chúng ta sẽ gọi window.iota hoặc dùng Wallet Adapter
  await delay(800); // Fake connecting UI
  
  // Tạo một địa chỉ ví IOTA giả lập (hex string)
  const mockAddress = "0x" + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  
  return {
    address: mockAddress,
    isConnected: true,
    balance: "1500.00 IOTA"
  };
};

// Hàm này mô phỏng việc gọi hàm `calculate_score` trong file quiz_game.move
export const calculateScoreOnChain = async (correctAnswers: number): Promise<number> => {
  console.log(`[Move VM] Đang gọi Contract tại move/sources/quiz_game.move...`);
  console.log(`[Move VM] Executing 0xCAFE::animal_quiz::calculate_score(correct_answers: ${correctAnswers})`);
  
  await delay(1000); // Simulate execution time on Move VM
  
  // Logic này phải khớp với hàm `calculate_score` trong file .move
  const score = correctAnswers * 2;
  
  console.log(`[Move VM] Kết quả trả về: ${score}`);
  return score;
};

// Hàm này mô phỏng transaction `submit_score`
export const submitScoreToMoveContract = async (address: string, score: number): Promise<string> => {
  console.log(`[Move VM] Preparing transaction for module 0xCAFE::animal_quiz::submit_score`);
  console.log(`[Move VM] Arguments: [score=${score}]`);
  console.log(`[Move VM] Signer: ${address}`);
  
  await delay(1500); // Fake processing time
  
  const txHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  return txHash;
};