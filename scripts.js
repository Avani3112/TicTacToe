document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const winnerElement = document.querySelector('.winner');
    const newGameBtn = document.querySelector('.new-game-btn');
    const playerTurnElement = document.querySelector('.player-turn');
    let currentPlayer = 'X';
    let cells = [];

    // Create the cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }

    function handleCellClick() {
        if (this.textContent !== '' || winnerElement.textContent !== '') return;
        this.textContent = currentPlayer;
        if (checkWinner()) {
            winnerElement.textContent = `${currentPlayer} wins!`;
        } else if (isDraw()) {
            winnerElement.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurnElement.textContent = currentPlayer;
        }
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                return true;
            }
        }
        return false;
    }

    function isDraw() {
        return cells.every(cell => cell.textContent !== '');
    }

    newGameBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        winnerElement.textContent = '';
        currentPlayer = 'X';
        playerTurnElement.textContent = 'X';
    });
});
