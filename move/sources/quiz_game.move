module doan_chu_iota::quiz_game {
use std::bcs;

```
// Struct to store a player's quiz submission
public struct QuizSubmission has key, store {
    id: UID,
    player: address,
    score: u8,       // score out of 10
}

// Error code if score is invalid
const EInvalidScore: u64 = 0;

#[allow(lint(self_transfer))]
public fun submit_quiz(score: u8, ctx: &mut tx_context::TxContext) {
    // Only allow scores 0-10
    assert!(score <= 10, EInvalidScore);

    let sender = tx_context::sender(ctx);

    // Create a new QuizSubmission object
    let submission = QuizSubmission {
        id: object::new(ctx),
        player: sender,
        score
    };

    // Simulate sending to the blockchain (like a public transfer)
    transfer::public_transfer(submission, sender);
}

// Optional: Verify a submission
public fun verify_submission(submission: &QuizSubmission) {
    // Here you could add logic to verify something about the submission
    // For example, check if score is correct, or log submission
}
```

}
