// 랜덤번호 지정
// 유저가 번호를 입력한다 > HTML
// 그리고 go 라는 버튼을 누름
// 유저가 입력한 번호를 가져온다
// 만약 유저가 랜덤 번호를 맞추면, 맞췄습니다!
// 랜덤 번호 < 유저번호 Down!
// 랜덤번호 > 유저번호 Up!
// reset 버튼 클릭 = 게임 리셋
// 5번의 기회, 다 쓸 경우 게임 종료 (더 이상 게임 불가, 버튼 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.

let coumputerNum = 0;
let playBtn = document.getElementById('play_btn');
// document는 웹페이지 그 자체. 아이디를 선택해 줄게. ('id 값');
let userInput = document.getElementById('user_input');
let resultArea = document.getElementById('result_area');
let resetBtn = document.getElementById('reset_btn');
let chances = 5;
let gameOver = false;
let chancesArea = document.getElementById('chances_area');
let history = [];

playBtn.addEventListener('click', play);
// 함수도 매개변수로 넘길 수 있음! play() X
// go 라는 버튼을 누름

resetBtn.addEventListener('click', reset);
// reset 버튼 클릭 = 게임 리셋

userInput.addEventListener('focus', function(){
  userInput.value='';
});
// 유저가 확인을 한 후 다시 커서가 포커스 됐을 때 숫자 작성 칸 초기화

function pickRandomNum() {
  coumputerNum = Math.floor(Math.random() * 100) + 1;
  // 랜덤번호 지정
  console.log('정답', coumputerNum);
}

function play() {
  let userValue = userInput.value;
  console.log(userValue);
  // 유저가 입력한 번호를 가져온다

  if (userValue < 1 || userValue > 100) { // 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다. chnaces 위에 작성
    resultArea.textContent = '1과 100사이 숫자를 입력해 주세요.';
    return;
  }

  if(history.includes(userValue)){
    resultArea.textContent = `${userValue} 번호는 이미 입력한 숫자입니다. 다른 숫자를 적어주세요.` 
    return;
  }
  chances--;
  chancesArea.textContent = `남은 기회: ${chances}번`;
  // 5번의 기회, 다 쓸 경우 게임 종료 (더 이상 게임 불가, 버튼 disable)
  console.log('chances =', chances);

  if (userValue < coumputerNum) {
    resultArea.textContent = 'UP!'
    console.log('Up!');
  } else if (userValue > coumputerNum) {
    resultArea.textContent = 'DOWN!'
    console.log('Down!');
  } else {
    resultArea.textContent = 'Correctly!!'
    console.log('정답!');
    gameOver = true;
  };
  // 만약 유저가 랜덤 번호를 맞추면, 맞췄습니다!
  // 랜덤 번호 < 유저번호 Down!
  // 랜덤번호 > 유저번호 Up!

    // 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.
    history.push(userValue);
    // 유저 작성 값을 저장한다. 
    console.log(history);
  

  // 5번의 기회, 다 쓸 경우 게임 종료 (더 이상 게임 불가, 버튼 disable)
  if (chances < 1) {
    gameOver = true;
  };

  if (gameOver == true) {
    playBtn.disabled = true;
  };
};
// play();

function reset() {
  // reset 버튼 클릭 = 게임 리셋

  userInput.value = ''; // 1. user input 정리
  pickRandomNum(); // 2. 새로운 랜덤 번호 생성
  resultArea.textContent = '결과는?'
}

pickRandomNum();