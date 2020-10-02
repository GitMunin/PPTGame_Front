const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column");
const pcScoreSpan = document.querySelector("[data-pc-score");
const tuScoreSpan = document.querySelector("[data-tu-score");
const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "scissors",
    emoji: "✌️",
    beats: "paper",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
];

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const pcSelection = randomSelection();
  const tuWinner = isWinner(selection, pcSelection);
  const pcWinner = isWinner(pcSelection, selection);

  addSelectionResult(pcSelection, pcWinner);
  addSelectionResult(selection, tuWinner);

  if (tuWinner) incrementScore(tuScoreSpan);
  if (pcWinner) incrementScore(pcScoreSpan);
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}
