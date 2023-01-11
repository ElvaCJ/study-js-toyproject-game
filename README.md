# study-js-toyproject-game
## A simple game for users to enjoy, which they should find and click carrots only between bugs in time and win.
### 2022.12 ~ 2023.01
---------------------
#### first commit
* HTML, CSS 완성
* JS 기록 
  * function getRandomPosition과 function addItem을 선언하여 game_btn클릭 -> carrot.img와 bug.img 생성 및 포지션 randomly.

#### second commit 
* JS 기록
  * function updateTimerText과 function startTimer를 선언하여 동적 타이머 생성
  * game_btn클릭 -> game_btn_icon의 .fa-play or .fa-stop에 따라 game_btn모양 변경 
  * function startGame()후 function stopGame() 실행될 경우 timer중지 및 pop_up section 나타남
  
* JS 안풀리는 문제들 
  1. 처음실행할 때"만" carrot.img 와 bug.img가 game_field크기 범위를 무시하고 벗어나서 배치되는 문제 ->game_field.appendChild(item)에 break point를 걸어봤는데 맨 처음 게임이 로딩됐을 때 i 반복문으로 하나하나씩이 아니라 한꺼번에 등장. 하지만 한 번 로딩 후 다시 game_btn을 클릭하면 i 반복문을 통해 img가 하나씩 배치됨을 눈으로 확인 가능

  + 실패한 여러시도들
    + CSS border-box 해결X
    + JS item.height*2하여 빼도 해결X
    + CSS visibility를 opacity로 변경했지만 해겵X
  
  2. function startTimer 내부에 function updateTimerText를 선언하고 작성하면(setInterval의 디폴트 초기 딜레이를 해결하기 위해 바로 직전에 작성) 의도대로 실행이 안됨. 즉, 1초 후 timer모양이 등장. 그런데 function updateTmerText 선언을 function startTimer 바깥에서 해준 후 호출해주거나, function으로 선언하지 않은 채 내부 코드만 작성해주면 setInterval의 딜레이 없애줌. -> 왜????? 함수 안에 또다른 함수 선언하면 안되는 건가???
