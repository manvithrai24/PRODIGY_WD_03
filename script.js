// Tic-Tac-Toe Game Logic
const gameBoard = document.getElementById('gameBoard');

if (gameBoard) {
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const player1 = localStorage.getItem('player1') || 'Player 1';
    const player2 = localStorage.getItem('player2') || 'Player 2';
    let gameActive = true;

    const cells = document.querySelectorAll('.cell');
    const currentPlayerDisplay = document.getElementById('currentPlayer');

    // Set initial player name to Player 1 (X)
    currentPlayerDisplay.textContent = `${player1}'s Turn (X)`;

    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                return gameState[a]; // Return the winner ('X' or 'O')
            }
        }
        // Check if there's a draw
        return gameState.includes('') ? null : 'Draw';
    }

    function handleClick(event) {
        const index = event.target.dataset.index;

        if (gameState[index] === '' && gameActive) {
            gameState[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                localStorage.setItem('winner', winner === 'Draw' ? 'Draw' : currentPlayer);
                window.location.href = 'result.html';
            } else {
                // Switch player and update display with player name
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                currentPlayerDisplay.textContent = currentPlayer === 'X' 
                    ? `${player1}'s Turn (X)` 
                    : `${player2}'s Turn (O)`;
            }
        }
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
}
