// ---------- SELECTORS ----------
const board  = document.getElementById('board');
const status = document.getElementById('status');
const newBtn = document.getElementById('newGameBtn');

// ---------- STATE ----------
let cells = Array(9).fill(null); // 9 empty squares
let currentPlayer = 'X';         // X always starts
let gameOver = false;

// ---------- WIN PATTERNS ----------
const wins = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

// ---------- DRAW BOARD ----------
function drawBoard() {
  board.innerHTML = '';
  cells.forEach((mark, idx) => {
    const cell = document.createElement('div');
    cell.className = 'cell' + (mark ? ' taken' : '');
    cell.dataset.index = idx;
    cell.textContent = mark;
    if (!gameOver && !mark) cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

// ---------- HANDLE CLICK ----------
function handleClick(e) {
  const idx = Number(e.target.dataset.index);
  if (cells[idx] || gameOver) return;

  cells[idx] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  checkWinner();
  updateStatus();
  drawBoard();
}

// ---------- CHECK WIN / DRAW ----------
function checkWinner() {
  for (const pattern of wins) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameOver = true;
      status.textContent = `${cells[a]} wins!`;
      return;
    }
  }
  if (cells.every(Boolean)) {
    gameOver = true;
    status.textContent = 'It\'s a draw!';
  }
}

// ---------- STATUS ----------
function updateStatus() {
  if (!gameOver) status.textContent = `${currentPlayer}'s turn`;
}

// ---------- NEW GAME ----------
function newGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  status.textContent = `${currentPlayer}'s turn`;
  drawBoard();
}

// ---------- INIT ----------
newBtn.addEventListener('click', newGame);
newGame(); // draw initial board