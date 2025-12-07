export interface Question {
  id: number;
  questionText: string;
  correctAnswer: string;
  hintKey: string; // Used for Gemini prompt
}

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export enum AnswerStatus {
  UNANSWERED = 'UNANSWERED',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT'
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  balance: string;
}

// Simulated Move Contract Event
export interface MoveContractEvent {
  module: string;
  function: string;
  args: any[];
}