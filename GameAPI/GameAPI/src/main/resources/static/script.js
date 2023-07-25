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

  // Add data-player-id attribute to the card
  playerCard.setAttribute('data-player-id', player.id);

  const id = document.createElement('p');
  id.textContent = `ID: ${player.id}`;

  const name = document.createElement('h3');
  name.textContent = player.name;

  const score = document.createElement('p');
  score.textContent = `Score: ${player.score}`;
  score.setAttribute('data-score', player.score); // Add data-score attribute to the score element

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deletePlayer(player.id));

  const updateForm = document.createElement('form');
  const updateInput = document.createElement('input');
  updateInput.type = 'number';
  updateInput.placeholder = 'Enter new score';
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update Score';
  updateButton.addEventListener('click', (event) => {
    event.preventDefault();
    const updatedScore = updateInput.value;
    updatePlayer(player.id, updatedScore);
  });

  updateForm.appendChild(updateInput);
  updateForm.appendChild(updateButton);

  playerCard.appendChild(id);
  playerCard.appendChild(name);
  playerCard.appendChild(score);
  playerCard.appendChild(deleteButton);
  playerCard.appendChild(updateForm); // Append the update form here

  return playerCard;
}


// Update a player's score
function updatePlayer(playerId, newScore) {
  const scoreElement = document.querySelector(`[data-player-id="${playerId}"] [data-score]`);
  if (!scoreElement) {
    console.error('Error updating player score: Score element not found');
    return;
  }

  fetch(`http://localhost:8080/api/v1/player/${playerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score: parseInt(newScore) }),
  })
    .then(() => {
      // Update the displayed score on the card
      scoreElement.textContent = `Score: ${newScore}`;
    })
    .catch((error) => {
      console.error('Error updating player score:', error);
    });
}



// Delete a player
function deletePlayer(playerId) {
  fetch(`http://localhost:8080/api/v1/player/${playerId}`, {
    method: 'DELETE',
  })
    .then(() => {
      fetchPlayers();
    });
}

// Handle form submission to create a new player
playerForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const score = document.getElementById('score').value;

  console.log(score); // Add this line to check the score value

  const newPlayer = {
    name: name,
    id: id,
    score: parseInt(score),
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
