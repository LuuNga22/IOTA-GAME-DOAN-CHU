
# IOTA-MOVE-ANIMAL-QUIZ
**IOTA-MOVE-ANIMAL-QUIZ** doan-chu-iota (IOTA-Word-Guess) is a minimalist Quiz Game application built on React and TypeScript, featuring simulated IOTA wallet connection and Smart Contract interaction.










## 🌟 Key Features

1.  **IOTA Wallet Connection:**
    *   Users must connect a (simulated) wallet to start the game.
    *   Supports displaying the wallet address after connection.

2.  **Gameplay Mechanics:**
    *   The question set consists of 5 trivia questions about animals.
    *   **Mechanism:**
        *   Input answer -> Press "Guess".
        *   **If correct:** Add 2 points, display a correct notificatiusing Vite:
npm run dev
```
Truy cập trình duyệt tại địa chỉ: `http://localhost:3000/` 

## 📂 Cấu trúc thư mục (File Structure)

```
IOTA-MOVE-ANIMAL-QUIZ/
├── index.html             # Main HTML file, includes Tailwind CDN
├── index.tsx              # Application entry point
├── App.tsx                # Root component managing game flow
├── types.ts               # TypeScript interfaces (Question, WalletState, etc.)
├── metadata.json          # Project metadata configuration
├── services/
│   ├── iotaService.ts     # Simulated wallet + smart contract service
│   └── geminiService.ts   # (Optional) AI service integration
├── move/                  # Move smart contract folder
│   ├── Move.toml
│   └── sources/
│       ├── quiz_game.move # Smart contract logic
│       └── Move.lock
├── components/
│   ├── ConnectWallet.tsx  # Wallet connection screen
│   ├── Quiz.tsx           # Main quiz logic
│   ├── Result.tsx         # Score + transaction result screen
│   └── Button.tsx         # Reusable button UI component

```

## 📝 Question Data (Demo)
The current set of questions is hardcoded in (Hardcoded) trong `components/Quiz.tsx`:

1.  Con gì bơi dưới nước, có vảy? -> **Cá**
2.  Con gì kêu 'meo meo', hay bắt chuột? -> **Mèo**
3.  Con gì to lớn, ăn cỏ và cho sữa? -> **Bò**
4.  Con gì bé xíu, chăm chỉ làm việc theo đàn? -> **Kiến**
5.  Con gì có cánh, bay lượn trên bầu trời? -> **Chim**



