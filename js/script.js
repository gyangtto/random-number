let computerNum = 0;
let startArea = document.getElementById('start-area');
let userName = document.getElementById('user_name');
let userId = userName.value;
let startBtn = document.getElementById('start_btn');
let submitArea = document.getElementById('submit-area');
let submitBtn = document.getElementById('submit_btn');
let dartImg = document.querySelector('#dart-img');
let userNum = document.getElementById('user_number');

let answerTxt = document.getElementById('answer_txt');
let resetBtn = document.getElementById('reset_btn');
let chances = 5;
let chancesTxt = document.getElementById('chance-txt');
let gameOver = false;
let history = [];

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', reset);
submitBtn.addEventListener('click', playGame);
userNum.addEventListener('focus', function () {
  userNum.value = '';
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 20) + 1;
  console.log('정답', computerNum);
}

function startGame() {
  submitBtn.disabled = false;
  if (userName.value.length < 2 || userName.value.length > 7) {
    alert('이름은 2~7글자 사이로 입력해주세요.');
    userName.value = '';
    return;
  }

  setTimeout(() => {
    console.log("setTimeout 작동됨");
    startArea.classList.add('hidden');
    submitArea.classList.add('show');
    resetBtn.style.display = 'block';
  }, 600);

  dartImg.classList.add('rotate');
}

const angleMapping = {
  20: 0,
  5: 18,
  12: 36,
  9: 54,
  14: 72,
  11: 90,
  8: 108,
  16: 126,
  7: 144,
  19: 162,
  3: 180,
  17: 198,
  2: 216,
  15: 234,
  10: 252,
  6: 270,
  13: 288,
  4: 306,
  18: 324,
  1: 342
};

function playGame() {
  let userValue = userNum.value;
  console.log(userValue);
  // 유저가 입력한 번호를 가져온다

  if (userValue < 1 || userValue > 20) {
    alert(`${userValue} 숫자는 1~20 범위를 벗어난 숫자입니다. 다른 숫자를 적어주세요.`);
    userNum.value = '';
    return;
  }

  if (history.includes(userValue)) {
    alert(`${userValue} 번호는 이미 입력한 숫자입니다. 다른 숫자를 적어주세요.`);
    userNum.value = '';
    return;
  }
  history.push(userValue);

  const angle = angleMapping[userValue];
  dartImg.style.transform = `rotate(${angle}deg)`;

  let resultText = '';

  if (userValue === computerNum) {
    resultText = `정답! ${computerNum}`;
    alert(`${userName.value}님! 축하합니다! YOU WIN!`);
    gameOver = true;
  } else if (userValue > computerNum) {
    resultText = 'Down!';
  } else {
    resultText = 'Up!';
  }

  answerTxt.textContent = resultText;

  setTimeout(() => {
    dartImg.classList.remove('rotate');
    setTimeout(() => {
      if (!gameOver) {
        answerTxt.textContent = '?';
        dartImg.classList.add('rotate');
      }
    }, 2000);
  }, 400);

  if (!gameOver) {
    chances--;
    chancesTxt.textContent = `남은 기회: ${chances} Coin`;

    // 다트 펜 이미지 제어
    const dartcoinImgs = document.querySelectorAll('.dart-coin');
    for (let i = 0; i < dartcoinImages.length; i++) {
      if (i < chances) { // 현재 기회에 해당하는 펜 이미지만 보이도록 수정
        dartcoinImgs[i].style.display = 'block';
      } else {
        dartcoinImgs[i].style.display = 'none';
      }
    }

    if (chances === 0) {
      gameOver = true;
      userNum.disabled = true;
      submitBtn.disabled = true;
      alert(`${userName.value}님, 아쉽게도 모든 코인을 사용하셨습니다. Game Over!.`);
      const overAngle = angleMapping[computerNum];
      dartImg.style.transform = `rotate(${overAngle}deg)`;
    }
  }
}

function reset() {
  userName.value = '';
  userNum.value = '';
  pickRandomNum();
  dartImg.classList.remove('rotate');
  startArea.classList.remove('hidden');
  submitArea.classList.remove('show');
  resetBtn.style.display = 'none';
  chancesTxt.textContent = `남은 기회: 5 Coin`;
  gameOver = false;
  history = [];
}

pickRandomNum();