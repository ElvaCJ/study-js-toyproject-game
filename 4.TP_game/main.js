const game_field = document.querySelector('.game_field');
const game_btn = document.querySelector('.game_btn');
const game_btn_icon = game_btn.querySelector('.fa-play');
const game_timer = document.querySelector('.game_timer');
const carrot_counter = document.querySelector('.carrot_counter');
const pop_up = document.querySelector('.pop-up');
const refresh_btn = document.querySelector('.refresh_btn');
const pop_up_message = document.querySelector('.pop-up_message');
const pop_up_win = document.querySelector('.pop-up_win');

const carrot_num = Math.floor(Math.random()*10) + 6;
const bug_num = Math.floor(Math.random()*10) + 6;
const game_duration_sec = 10;

const carrot_sound = new Audio('sound/carrot_pull.mp3');
const bug_sound = new Audio('sound/bug_pull.mp3');
const bg_sound = new Audio ('sound/bg.mp3');
const alert_sound = new Audio ('sound/alert.wav');
const win_sound = new Audio ('sound/game_win.mp3');

let started = false;
let counter = 0;
let timer_interval = undefined;

game_btn.addEventListener('click', () => {
    if (started) {
        alert_sound.play();
        stopGame()
    } else {
        startGame()
    }
    started = !started;
});

game_field.addEventListener('click', onFieldClick);

function startGame() {
    //background sound 처음부터 재생
    bg_sound.currentTime = 0;
    bg_sound.play();

    // 당근과 벌레(각 5개)를 랜덤 포지션 지정 -> game_field에 추가
    game_field.innerHTML = ``;
    game_field.style.position = 'relative';
    addItem('carrot', carrot_num, 'img/carrot.png');
    addItem('bug', bug_num, 'img/bug.png');
    
    //stop버튼 나타남
    game_btn_icon.classList.add('fa-stop');
    game_btn_icon.classList.remove('fa-play');

    //game_timer, carrot_counter 나타남
    game_timer.style.visibility = 'visible';
    carrot_counter.style.visibility = 'visible';

    //game_timer시작 함수
    startTimer(game_duration_sec);
    //carrot_counter 갯수 보여줌
    carrot_counter.innerHTML = `${carrot_num}`;

    //pop-up section 사라짐, game_btn 재등장 (+ startGame() 코드 반복)
    refresh_btn.addEventListener('click', (event)=>{
        pop_up.classList.add('pop-up--hide')
        game_btn.style.visibility = 'visible';

        bg_sound.currentTime = 0;
        bg_sound.play();

        game_field.innerHTML = ``;
        game_field.style.position = 'relative';
        addItem('carrot', carrot_num, 'img/carrot.png');
        addItem('bug', bug_num, 'img/bug.png');

        started = !started;

        game_btn_icon.classList.add('fa-stop');
        game_btn_icon.classList.remove('fa-play');

        startTimer(game_duration_sec);
        carrot_counter.innerHTML = `${carrot_num}`;

        //counter 초기화
        counter = 0;
    });  
};
function stopGame() {
    //background sound 정지
    bg_sound.pause();

    //start버튼 나타남
    game_btn_icon.classList.add('fa-play');
    game_btn_icon.classList.remove('fa-stop');

    //game_btn.fa-stop클릭 -> pop-up section 나타남, game_timer 중지, game_btn 사라짐
    clearInterval(timer_interval);
    pop_up.classList.remove('pop-up--hide');
    game_btn.style.visibility = 'hidden';
};

function addItem(className, count, imgPath) {
    for (i = 0; i < count; i++) {
        let item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);

        item.style.display = 'inline-block';
        item.style.position ='absolute';
        item.style.left = getRandomPosition(0, (game_field.clientWidth - item.width)) + 'px';
        item.style.top = getRandomPosition(0, (game_field.clientHeight - item.height)) + 'px';

        game_field.appendChild(item);
    };
};
function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
};

//setInterval()을 사용한 타이머 만들기
function startTimer(time) {
    updateTimerText(time);
    timer_interval = setInterval(() => {
        if (time <= 0) {
            bg_sound.pause();
            bug_sound.play();
            clearInterval(timer_interval);
            //시간초과 후 pop-up섹션 등장, game_btn 사라짐, started상태 변경
            pop_up.classList.remove('pop-up--hide');
            game_btn.style.visibility = 'hidden';
            started = !started;
            return;
        } else {
            updateTimerText(--time);
        }
    }, 1000);
};
function updateTimerText(givenSeconds) {
    let minutes = Math.floor(givenSeconds / 60);
    let seconds = givenSeconds % 60;
    game_timer.innerHTML = seconds < 10 ? `0${minutes}:0${seconds}` : `0${minutes}:${seconds}`;
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const clickTarget = event.target;
    if (clickTarget.matches('.carrot')) {
        carrot_sound.play();
        clickTarget.remove();
        counter++;
        carrot_counter.innerText = carrot_num - counter;
        if (counter === carrot_num) {
            win_sound.play();
            stopGame();
            started = !started;
            //counter 초기화
            counter = 0;

            pop_up_win.classList.remove('not_yet_win');
            pop_up_message.classList.add('now_win');
        }
    } else if (clickTarget.matches('.bug')) {
        bug_sound.play();
        stopGame();
        started = !started;
        //counter 초기화
        counter = 0;

        pop_up_win.classList.add('not_yet_win');
        pop_up_message.classList.remove('now_win');
    }
};