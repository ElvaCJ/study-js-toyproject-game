const game_field = document.querySelector('.game_field');
const game_btn = document.querySelector('.game_btn');
const game_btn_icon = game_btn.querySelector('.fa-play');
const game_timer = document.querySelector('.game_timer');
const carrot_counter = document.querySelector('.carrot_counter');
const pop_up = document.querySelector('.pop-up');
const refresh_btn = document.querySelector('.refresh_btn');

const carrot_num = 5;
const bug_num = 5;
const game_duration_sec = 10;

let started = false;
let counter = 0;
let timer_interval = undefined;

game_btn.addEventListener('click', () => {
    if (started) {
        stopGame()
    } else {
        startGame()
    }
    started = !started;
});

function startGame() {
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

    //pop-up section 사라짐
    refresh_btn.addEventListener('click', (event)=>{
        pop_up.classList.add('pop-up--hide')
    });
};
function stopGame() {
    //start버튼 나타남
    game_btn_icon.classList.add('fa-play');
    game_btn_icon.classList.remove('fa-stop');

    // game_btn.fa-stop클릭 -> pop-up section 나타남 & game_timer 중지
    clearInterval(timer_interval);
    pop_up.classList.remove('pop-up--hide');
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
            clearInterval(timer_interval);
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
