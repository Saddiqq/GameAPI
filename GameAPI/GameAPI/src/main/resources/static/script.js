// script.js
const playerContainer = document.getElementById('player-container');
const playerForm = document.getElementById('player-form');

// Fetch all players from the API
function fetchPlayers() {
  fetch('http://localhost:8080/api/v1/player')
    .then(response => response.json())
    .then(players => {
      playerContainer.innerHTML = ''; // Clear the existing player cards

      players.forEach(player => {
        const playerCard = createPlayerCard(player);
        playerContainer.appendChild(playerCard);
      });
    });
}

// Create a player card
function createPlayerCard(player) {
  const playerCard = document.createElement('div');
  playerCard.classList.add('player-card');

  const name = document.createElement('h3');
  name.textContent = player.name;

  const score = document.createElement('p');
  score.textContent = `Score: ${player.score}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deletePlayer(player.id));

  playerCard.appendChild(name);
  playerCard.appendChild(score);
  playerCard.appendChild(deleteButton);

  return playerCard;
}

// Delete a player
function deletePlayer(playerId) {
  fetch(`http://localhost:8080/players/${playerId}`, {
    method: 'DELETE',
  })
    .then(() => fetchPlayers());
}

// Handle form submission to create a new player
playerForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  const newPlayer = {
    name: name,
    id: parseInt(score),
  };

  fetch('http://localhost:8080/api/v1/player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPlayer),
  })
    .then(() => {
      fetchPlayers();
      playerForm.reset();
    });
});

// Fetch players on page load
fetchPlayers();