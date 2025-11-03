const cardsArray = ['🐶','🐱','🐭','🐹','🦊','🐻','🐼','🐸'];
let gameBoard = document.getElementById('gameBoard');
let message = document.getElementById('message');

let cards = [...cardsArray, ...cardsArray]; // duplicate to make pairs
let flippedCards = [];
let matchedCards = [];

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create cards
cards.forEach((emoji) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front">${emoji}</div>
    <div class="back"></div>
  `;
  card.addEventListener('click', () => flipCard(card, emoji));
  gameBoard.appendChild(card);
});

// Flip card function
function flipCard(card, emoji) {
  if (flippedCards.length === 2 || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push({ card, emoji });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check for match
function checkMatch() {
  let [first, second] = flippedCards;
  if (first.emoji === second.emoji) {
    matchedCards.push(first, second);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      message.textContent = '🎉 You Win!';
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove('flip');
      second.card.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
}
