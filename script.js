const steps = document.querySelectorAll('.step');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const form = document.getElementById('multiStepForm');
const result = document.getElementById('result');
let currentStep = 0;

nextBtn.addEventListener('click', () => {
  const currentField = steps[currentStep].querySelector('input, select');
  if (!currentField || !currentField.checkValidity()) {
    currentField?.reportValidity();
    return;
  }
  steps[currentStep].classList.remove('active');
  currentStep++;
  if (currentStep < steps.length) {
    steps[currentStep].classList.add('active');
    progressBar.style.width = `${(currentStep / steps.length) * 100}%`;
  } else {
    progressBar.style.width = '100%';
    form.style.display = 'none';
    result.style.display = 'block';
  }
});

let targetNumber, attemptsUsed;

function startGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attemptsUsed = 0;
  document.getElementById('guessInput').disabled = false;
  document.getElementById('guessInput').value = "";
  document.getElementById('attemptCount').textContent = attemptsUsed;
  document.getElementById('gameMsg').textContent = "";
  document.getElementById('result').style.display = 'none';
  document.getElementById('game').style.display = 'block';

  const wrapper = document.getElementById('scaleWrapper');
  const bubu = document.getElementById('bubuMarker');
  const dudu = document.getElementById('duduMarker');
  const congrats = document.getElementById('congratsImage');

  wrapper.style.display = 'block';
  congrats.style.display = 'none';

  bubu.style.display = 'block';
  dudu.style.display = 'block';

  bubu.style.left = `${mapValueToScale(targetNumber)}px`;
  dudu.style.left = `${mapValueToScale(1)}px`;
}

function checkGuess() {
  const guess = parseInt(document.getElementById('guessInput').value);
  const msg = document.getElementById('gameMsg');
  const countDisplay = document.getElementById('attemptCount');
  const dudu = document.getElementById('duduMarker');
  const bubu = document.getElementById('bubuMarker');
  const congrats = document.getElementById('congratsImage');

  if (isNaN(guess) || guess < 1 || guess > 100) {
    msg.textContent = "⚠️ Enter a number between 1 and 100!";
    return;
  }

  attemptsUsed++;
  countDisplay.textContent = attemptsUsed;

  dudu.style.left = `${mapValueToScale(guess)}px`;

  if (guess === targetNumber) {
    msg.textContent = `🎉 Correct! You guessed it in ${attemptsUsed} tries!`;
    document.getElementById('guessInput').disabled = true;

    dudu.style.display = 'none';
    bubu.style.display = 'none';

    congrats.style.display = 'block';
    congrats.style.left = `${mapValueToScale(targetNumber)}px`;

    document.getElementById('successSound').play();
  } else {
    msg.textContent = guess > targetNumber ? "⬇️ Too high!" : "⬆️ Too low!";
    congrats.style.display = 'none';
    dudu.style.display = 'block';
    bubu.style.display = 'block';
  }
}

function restartGame() {
  startGame();
  document.getElementById('guessInput').value = '';
}

function mapValueToScale(value) {
  const track = document.getElementById('scaleTrack');
  const trackWidth = track.offsetWidth;
  return ((value - 1) / 99) * trackWidth;
}
