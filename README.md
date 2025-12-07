# IOTA-MOVE-ANIMAL-QUIZ 🍕🧠

A high-contrast Black & White animal quiz game project, integrating AI (Gemini) and simulating interaction with the IOTA Move Smart Contract (Pizza Box Module).
<img width="1919" height="946" alt="image" src="https://github.com/user-attachments/assets/843738e3-7811-44ff-b4ad-58a3194b555c" />


## 📂 Project Structure

```text
IOTA-MOVE-ANIMAL-QUIZ/
├── index.html            # Main HTML file, includes Tailwind CDN config
├── index.tsx             # Application entry point
├── App.tsx               # Root component, manages game flow (Intro -> Quiz -> Result)
├── types.ts              # TypeScript Interface definitions (Question, WalletState...)
├── metadata.json         # Project metadata configuration
├── services/
│   ├── iotaMoveService.ts # Simulated wallet & Smart Contract interaction service (Pizza Box)
│   └── geminiService.ts   # Google Gemini AI integration service (Fun Facts)
├── move/                 # Move Smart Contract source folder
│   ├── Move.toml         # Move Package Configuration
│   └── sources/
│       ├── quiz_game.move # Smart Contract Logic (Module: pizza_box::pizza)
│       └── Move.lock     # Version lock file
├── components/
│   ├── WalletConnect.tsx # Wallet connection screen and button component
│   ├── QuizInterface.tsx # Main Quiz Logic: Displays question, input, answer check
│   └── Result.tsx        # (Integrated in App) Displays score & Transaction Hash
```

## Explorer Link & Contract Address
* Network: Testnet
* Package ID: 0xf125cefba8ca4c583b120ff6decba0b2c4874f5efc75a2009230723c9f64d202
* Explorer: [View on IOTA Explorer](https://explorer.iota.org/object/0xefa9255cafe614ade205de0651cd9ec23f8523ac161493eb01da25908f214177?network=testnet)
## 🚀 Key Features

1.  **Black & White Interface:** Minimalist design, high contrast, Terminal/Console style.
2.  **Quiz Mechanics:**
    *   **Flow:** Input answer -> Press "Guess" -> Check Correct/Incorrect -> Press "Next".
    *   **Content:** 5 questions about animals (Bird, Fish, Cow, Shrimp, Cat).
    *   **AI Integration:** Uses **Gemini AI** to display "Fun Facts" about the animal after each answer.
3.  **IOTA & Move Integration:**
    *   **Wallet Connection:** Mandatory simulated wallet connection to start the game.
    *   **Smart Contract (`pizza_box`):**
        *   Uses module `pizza_box::pizza`.
        *   Function `cook` is called upon game completion.
        *   Player score is converted into ingredient amounts (e.g., `flour`) for on-chain storage.

## 🛠 Installation & Run

**Prerequisites:** Node.js (v16 or higher)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Environment
```bash
npm start
# Or
npm run dev
```
Access the browser at the provided address (usually `http://localhost:3000`).

## 📜 Smart Contract Info (Move)

Contract source code is located in the directory `move/sources/quiz_game.move`.

*   **Package Name:** `pizza_box`
*   **Module:** `pizza`
*   **Functions:**
    *   `cook(...)`: Creates a `PizzaBox` object containing ingredient parameters. In this game, your score determines the quality of the Pizza created on the blockchain!

## 📸 How to Play

1.  Click the **[ CONNECT IOTA WALLET ]** button in the top right corner.
2.  Click **ACTIVATE GAME** on the welcome screen.
3.  Read the question and enter the animal name (Vietnamese, e.g., "mèo", "cá").
4.  Click **GUESS** to check.
    *   *Correct:* +2 points, highlights white.
    *   *Incorrect:* Shows the correct answer.
5.  After completing 5 questions, wait for the **Move VM** to calculate the score and click the button to save the result to the Blockchain.

---
*Developed with React, TypeScript, Tailwind CSS & Move Language.*
