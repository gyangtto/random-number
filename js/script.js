let computerNum = 0; // 컴퓨터가 선택한 랜덤 숫자를 저장하는 변수
let dartImg = document.querySelector('#dart-img'); // 다트 이미지 요소를 가져오는 변수
let answerTxt = document.getElementById('answer_txt'); // 정답 텍스트를 출력하는 요소를 가져오는 변수
let dartcoinImgs = document.querySelectorAll('.dart-coin'); // 다트 코인 이미지들을 가져오기
let userNum = document.getElementById('user_number'); // 사용자가 입력한 숫자를 가져오는 변수

let startArea = document.getElementById('start-area'); // 시작 영역 요소를 가져오는 변수
let userName = document.getElementById('user_name'); // 사용자 이름 입력 요소를 가져오는 변수
let startBtn = document.getElementById('start_btn'); // 시작 버튼 요소를 가져오는 변수
let submitArea = document.getElementById('submit-area'); // 제출 영역 요소를 가져오는 변수
let submitBtn = document.getElementById('submit_btn'); // 제출 버튼 요소를 가져오는 변수

let resetBtn = document.getElementById('reset_btn'); // 리셋 버튼 요소를 가져오는 변수
let chances = 5; // 기회를 나타내는 변수
let chancesTxt = document.getElementById('chance-txt'); // 기회 텍스트를 출력하는 요소를 가져오는 변수
let gameOver = false; // 게임 종료 여부를 나타내는 변수
let history = []; // 사용자가 입력한 숫자 기록을 저장하는 배열

startBtn.addEventListener('click', startGame); // 시작 버튼에 클릭 이벤트 리스너 추가
resetBtn.addEventListener('click', reset); // 리셋 버튼에 클릭 이벤트 리스너 추가
submitBtn.addEventListener('click', playGame); // 제출 버튼에 클릭 이벤트 리스너 추가
userNum.addEventListener('focus', function () {
  userNum.value = '';
}); // 사용자가 숫자를 입력하기 전에 입력란을 초기화하는 이벤트 리스너 추가

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 20) + 1; // 1부터 20까지의 랜덤한 숫자를 선택하여 computerNum 변수에 저장
  console.log('정답', computerNum); // 선택된 정답 숫자를 콘솔에 출력
}

function startGame() {
  submitBtn.disabled = false; // 제출 버튼 활성화
  if (userName.value.length < 2 || userName.value.length > 7) { // 사용자 이름이 2자 미만이거나 7자 초과인 경우
    alert('이름은 2~7글자 사이로 입력해주세요.'); // 알림을 통해 메시지 출력
    userName.value = ''; // 사용자 이름 입력란 초기화
    return; // 함수 종료
  }

  setTimeout(() => { // 0.6초 후에 실행
    startArea.classList.add('hidden'); // 시작 영역 숨김
    submitArea.classList.add('show'); // 제출 영역 표시
    resetBtn.style.display = 'block'; // 리셋 버튼 표시
  }, 600);

  dartImg.classList.add('rotate'); // 다트 이미지 회전 효과 추가
}

const angleMapping = { // 숫자와 다트 회전 각도의 매핑
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
  let userValue = parseInt(userNum.value, 10); // 사용자가 입력한 숫자를 숫자로 변환
  console.log(userValue)

  if (userValue < 1 || userValue > 20) { // 입력된 숫자가 1부터 20 사이가 아닌 경우
    alert(`${userValue} 숫자는 1~20 범위를 벗어난 숫자입니다. 다른 숫자를 적어주세요.`); // 알림을 통해 메시지 출력
    userNum.value = ''; // 숫자 입력란 초기화
    return; // 함수 종료
  }

  if (history.includes(userValue)) { // 이미 입력된 숫자인 경우
    alert(`${userValue} 번호는 이미 입력한 숫자입니다. 다른 숫자를 적어주세요.`); // 알림을 통해 메시지 출력
    userNum.value = ''; // 숫자 입력란 초기화
    return; // 함수 종료
  }
  history.push(userValue); // 입력된 숫자를 기록에 추가

  const angle = angleMapping[userValue]; // 입력된 숫자에 해당하는 다트 회전 각도 가져오기
  dartImg.style.transform = `rotate(${angle}deg)`; // 다트 이미지를 해당 각도로 회전

  let resultText = ''; // 결과 텍스트 초기화

  if (userValue === computerNum) { // 입력된 숫자가 정답과 같은 경우
    resultText = `정답! ${computerNum}`; // 결과 텍스트 설정
    alert(`${userName.value}님! 축하합니다! YOU WIN!`); // 알림을 통해 이겼음을 알림
    gameOver = true; // 게임 종료 상태로 변경
    submitBtn.disabled = true; // 게임 종료 후에 제출 버튼 비활성화
  } else if (userValue > computerNum) { // 입력된 숫자가 정답보다 큰 경우
    resultText = 'Down!'; // 결과 텍스트 설정
  } else { // 입력된 숫자가 정답보다 작은 경우
    resultText = 'Up!'; // 결과 텍스트 설정
  }

  answerTxt.textContent = resultText; // 결과 텍스트를 화면에 출력

  setTimeout(() => { // 0.4초 후에 실행
    dartImg.classList.remove('rotate'); // 다트 이미지의 회전 효과 제거
    setTimeout(() => { // 2초 후에 실행
      if (!gameOver) { // 게임이 종료되지 않은 경우
        answerTxt.textContent = '?'; // 결과 텍스트를 물음표로 변경
        dartImg.classList.add('rotate'); // 다트 이미지에 회전 효과 추가
      }
    }, 2000);
  }, 400);

  if (!gameOver) { // 게임이 종료되지 않은 경우
    chances--; // 기회 감소
    chancesTxt.textContent = `남은 기회: ${chances}번`; // 남은 기회 텍스트 업데이트

    // 다트 펜 이미지 제어
    for (let i = 0; i < dartcoinImgs.length; i++) { // 모든 다트 코인 이미지에 대해 반복
      if (i < chances) { // 현재 기회에 해당하는 다트 코인 이미지인 경우
        dartcoinImgs[i].style.display = 'block'; // 보이도록 설정
      } else { // 그렇지 않은 경우
        dartcoinImgs[i].style.display = 'none'; // 숨김 처리
      }
    }

    if (chances <= 0) { // 기회가 0 이하가 된 경우
      gameOver = true; // 게임 종료 상태로 변경
      userNum.disabled = true; // 숫자 입력란 비활성화
      submitBtn.disabled = true; // 제출 버튼 비활성화
      alert(`${userName.value}님, 아쉽게도 모든 코인을 사용하셨습니다. Game Over!`); // 알림을 통해 게임 종료 메시지 출력
      const overAngle = angleMapping[computerNum]; // 정답에 해당하는 각도 가져오기
      dartImg.style.transform = `rotate(${overAngle}deg)`; // 다트 이미지를 해당 각도로 회전
    }
  }
}

function reset() {
  gameOver = false; // 게임 종료 상태 해제
  userName.value = ''; // 사용자 이름 입력란 초기화
  chances = 5; // 기회 초기화

  history = []; // 기록 초기화
  userNum.value = ''; // 숫자 입력란 초기화
  pickRandomNum(); // 정답 숫자 저장

  userNum.disabled = false; // 숫자 입력란 활성화
  submitArea.classList.remove('show'); // 제출 영역 숨김
    submitBtn.disabled = false; // 제출 버튼 활성화

  dartImg.classList.remove('rotate'); // 다트 이미지 회전 효과 제거
  startArea.classList.remove('hidden'); // 시작 영역 보이도록 변경

  chancesTxt.textContent = `남은 기회: 5 Coin`; // 남은 기회 텍스트 초기화
    // 모든 다트 코인 이미지들을 한 번에 보이도록 처리
    dartcoinImgs.forEach(function(coinImg) {
      coinImg.style.display = 'block';
    });

  resetBtn.style.display = 'none'; // 리셋 버튼 숨김
}

pickRandomNum(); // 초기에 정답 숫자 선택
