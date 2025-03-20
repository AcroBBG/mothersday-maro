document.addEventListener("DOMContentLoaded", () => {
    const revealMessageBtn = document.getElementById("reveal-message");
    const heartfeltMessage = document.getElementById("heartfelt-message");
    const memoryButton = document.getElementById("start-memory");
       const clickerButton = document.getElementById("start-clicker");
    const gameContainer = document.getElementById("game-container");

    // 💌 Reveal heartfelt message
    revealMessageBtn.addEventListener("click", () => {
        heartfeltMessage.classList.add("show");
    });

    // 🎮 Start Memory Game
    memoryButton.addEventListener("click", startMemoryGame);

    function startMemoryGame() {
        gameContainer.style.display = "block";
        gameContainer.innerHTML = "<h3>🧠 Memory Game</h3><div class='memory-grid' id='memory-grid'></div>";

        let emojis = ["💖", "💖", "🌹", "🌹", "🎁", "🎁", "🎉", "🎉"];
        emojis.sort(() => Math.random() - 0.5);

        let grid = document.getElementById("memory-grid");
        let selectedCards = [];
        let matchedPairs = 0;

        emojis.forEach((emoji) => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.dataset.emoji = emoji;
            card.innerHTML = "❓"; // Hidden state
            card.addEventListener("click", () => flipCard(card));
            grid.appendChild(card);
        });

        function flipCard(card) {
            if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
                card.classList.add("flipped");
                card.innerHTML = card.dataset.emoji;
                selectedCards.push(card);
                
                if (selectedCards.length === 2) {
                    setTimeout(checkMatch, 500);
                }
            }
        }

        function checkMatch() {
            let [card1, card2] = selectedCards;

            if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add("matched");
                card2.classList.add("matched");
                matchedPairs++;

                if (matchedPairs === emojis.length / 2) {
                    setTimeout(() => {
                        alert("🎉 Congratulations! You matched all pairs!");
                        startMemoryGame();
                    }, 500);
                }
            } else {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1.innerHTML = "❓";
                card2.innerHTML = "❓";
            }

            selectedCards = [];
        }
    }

    function startClickerGame() {
        gameContainer.style.display = "block";
        gameContainer.innerHTML = `
            <h3>💖 Clicker Challenge</h3>
            <p>Click as many times as you can in <b>30 seconds!</b></p>
            <button id="click-button">💖 Click Me!</button>
            <p>Score: <span id="clicker-score">0</span></p>
            <p id="timer">⏳ Time Left: 30s</p>
        `;

        let clickButton = document.getElementById("click-button");
        let scoreDisplay = document.getElementById("clicker-score");
        let timerDisplay = document.getElementById("timer");
        let score = 0;
        let timeLeft = 30;

        function updateScore() {
            score++;
            scoreDisplay.textContent = score;
            spawnHeartEffect(event);
        }

        function spawnHeartEffect(event) {
            let heart = document.createElement("span");
            heart.classList.add("heart-particle");
            heart.textContent = "💖";
            document.body.appendChild(heart);

            // Position the heart effect near the click location
            let x = event.clientX;
            let y = event.clientY;
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;

            setTimeout(() => heart.remove(), 800);
        }

        clickButton.addEventListener("click", updateScore);

        // Timer countdown
        let timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `⏳ Time Left: ${timeLeft}s`;

            if (timeLeft === 0) {
                clearInterval(timer);
                clickButton.disabled = true;
                timerDisplay.textContent = "⏳ Time's up!";
                
                setTimeout(() => {
                    alert(`🎉 You scored ${score} points! Try again?`);
                    startClickerGame();
                }, 1000);
            }
        }, 1000);
    }
});
