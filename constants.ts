import { Question } from './types';

export const GAME_QUESTIONS: Question[] = [
  {
    id: 1,
    questionText: "Con gì có cánh, biết bay, hót líu lo trên cành cây?",
    correctAnswer: "chim",
    hintKey: "bird"
  },
  {
    id: 2,
    questionText: "Con gì sống ở dưới nước, thở bằng mang, bơi lội tung tăng?",
    correctAnswer: "cá",
    hintKey: "fish"
  },
  {
    id: 3,
    questionText: "Con gì ăn cỏ, có sừng, giúp người nông dân cày ruộng?",
    correctAnswer: "bò",
    hintKey: "cow"
  },
  {
    id: 4,
    questionText: "Con gì nhiều chân, có râu dài, búng tanh tách, khi nấu chín thì đỏ au?",
    correctAnswer: "tôm",
    hintKey: "shrimp"
  },
  {
    id: 5,
    questionText: "Con gì kêu meo meo, thích bắt chuột và nằm sưởi nắng?",
    correctAnswer: "mèo",
    hintKey: "cat"
  }
];

export const MAX_SCORE = 10;
export const POINTS_PER_QUESTION = 2;