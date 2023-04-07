let grid = null;
let currentPlayer = 'X';

function createGrid() {
	const gridSize = document.getElementById('gridSize').value;
	
  if (gridSize < 3 || gridSize > 100) {
		alert('Grid size must be between 3 and 100');
		return;
	}

   grid = [];
   for (let i = 0; i < gridSize; i++) {
	const row = [];
	for (let j = 0; j < gridSize; j++) {
		row.push(null);
	}
		grid.push(row);
	}

	const gridContainer = document.getElementById('grid');
	gridContainer.innerHTML = '';
	gridContainer.style.width = `${gridSize * 52}px`;
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			cell.addEventListener('click', () => {
				if (grid[i][j] !== null) {
					return;
				}
				grid[i][j] = currentPlayer;
				cell.innerText = currentPlayer;
				cell.style.color = currentPlayer === 'X' ? 'green' : 'blue';
				checkWinner();
				currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			});
			gridContainer.appendChild(cell);
		}
	}
}

function audioSania() {
  const audioSania = new Audio("sounds/sania.mp3")
  audioSania.play();
}

function cheese() {
  const cheese = new Audio("sounds/cheese.mp3")
  cheese.play();
}

function checkWinner() {
	const gridSize = grid.length;
	// Чекаю рядки
	for (let i = 0; i < gridSize; i++) {
		if (grid[i].every(cell => cell === currentPlayer)) {
	   audioSania();
	   alert(`${currentPlayer} wins!`);
       setTimeout(() => {
        location.reload();
      }, 1000)
			clearGrid();
			return;
		}
	}

	// Чекаю колонки
	for (let j = 0; j < gridSize; j++) {
		let win = true;
		for (let i = 0; i < gridSize; i++) {
			if (grid[i][j] !== currentPlayer) {
				win = false;
				break;
			}
		}

		if (win) {
	  audioSania();
      alert(`${currentPlayer} wins!`);
      setTimeout(() => {
        location.reload();
      }, 1000)
			clearGrid();
			return;
		}
	}

	// Чекаю діагоналі
	let win = true;
	for (let i = 0; i < gridSize; i++) {
		if (grid[i][i] !== currentPlayer) {
			win = false;
			break;
		}
	}

	if (win) {
	audioSania();
    alert(`${currentPlayer} wins!`);
    setTimeout(() => {
      location.reload();
    }, 1000)
		clearGrid();
		return;
	}
  
}