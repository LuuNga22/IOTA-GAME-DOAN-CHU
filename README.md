
# IOTA-GAME-DOAN-CHU
**doan-chu-iota** doan-chu-iota (IOTA-Word-Guess) is a minimalist Quiz Game application built on React and TypeScript, featuring simulated IOTA wallet connection and Smart Contract interaction.










## 🌟 Key Features

1.  **IOTA Wallet Connection:**
    *   Users must connect a (simulated) wallet to start the game.
    *   Supports displaying the wallet address after connection.

2.  **Gameplay Mechanics:**
    *   The question set consists of 5 trivia questions about animals.
    *   **Mechanism:**
        *   Input answer -> Press "Guess".
        *   **If correct:** Add 2 points, display a correct notification.
        *   **If incorrect:** No points added, the system displays the correct answer.
        *   The player presses "Next Question" to proceed.

3.  ** Scoring System & Smart Contract:**
    *   Maximum total score: 10/10.
    *   Upon completion, the system automatically simulates sending the score to the IOTA network (Tangle) via a Smart Contract.
    *   Displays a simulated transaction hash (Transaction Hash).

## 🛠 Technologies Used

*   **Core:** React 19, TypeScript
*   **Styling:** Tailwind CSS (CDN/Utility-first)
*   **Build Tool:** Vite (hoặc tương đương trong môi trường React hiện đại)
*   **Blockchain Simulation:** IOTA Service Mocking

## 🚀 Setup & Run Instructions

This project was developed in a Ubuntu environment. Ensure you have Node.js (version 16 or higher) and npm installed.

### 1. Clone the Project
Open your Terminal and run the following commands to download the source code:

```bash
git clone https://github.com/LuuNga22/IOTA-GAME-DOAN-CHU.git
cd IOTA-GAME-DOAN-CHU
```

### 2. Install Dependencies

Install the necessary library packages listed in package.json:

```bash
npm install
```

### 3. Run the Project (Development Mode)

Start the local development server:

```bash
npm start
# Hoặc nếu dự án sử dụng Vite:
npm run dev
```
Truy cập trình duyệt tại địa chỉ: `http://localhost:3000/` 

## 📂 Cấu trúc thư mục (File Structure)

```
doan-chu-iota/
├── index.html            # Main HTML file, includes Tailwind CDN
├── index.tsx             # Entry point of the React application
├── App.tsx               # Root component, manages Game state (Intro/Playing/Finished)
├── types.ts              # Defines TypeScript Interfaces (Question, WalletState...)
├── metadata.json         # Project metadata configuration
├── services/
│   └── iotaService.ts    # Service mocking Wallet connection and Smart Contract calls
└── components/
    ├── ConnectWallet.tsx # Welcome screen & IOTA Wallet connection
    ├── Quiz.tsx          # Main game logic: Displays questions, checks answers
    ├── Result.tsx        # Result screen & Transaction submission effect
    └── Button.tsx        # Reusable button component (Black and White Style)
```

## 📝 Question Data (Demo)
The current set of questions is hardcoded in (Hardcoded) trong `components/Quiz.tsx`:

1.  Con gì bơi dưới nước, có vảy? -> **Cá**
2.  Con gì kêu 'meo meo', hay bắt chuột? -> **Mèo**
3.  Con gì to lớn, ăn cỏ và cho sữa? -> **Bò**
4.  Con gì bé xíu, chăm chỉ làm việc theo đàn? -> **Kiến**
5.  Con gì có cánh, bay lượn trên bầu trời? -> **Chim**


trong file quiz_game.move

thêm nội dung giúp t 88170
