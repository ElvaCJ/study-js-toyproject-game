// 당근과 벌레(각 5개)를 랜덤 포지션 지정 -> game_field에 추가
const game_btn = document.querySelector('.game_btn');
const game_field = document.querySelector('.game_field');

game_btn.addEventListener('click', () => {
    game_field.innerHTML = ``;
    game_field.style.position = 'relative';
    
    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
});

function addItem(className, count, imgPath) {
    for (i = 0; i < count; i++) {
        let item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);

        item.style.display = 'inline-block';
        item.style.position ='absolute';
        item.style.left = getRandomPosition(0, (game_field.clientWidth-item.width)) + 'px';
        item.style.top = getRandomPosition(0, (game_field.clientHeight-item.height)) + 'px';

        game_field.appendChild(item);
    };
};
function getRandomPosition(min, max) {
    return Math.floor(Math.random() * (max - min));
};

// game_btn 클릭 -> game_timer && carrot_counter 나타남과 동시에 동작
// game_btn 재클릭 -> pop-up section 나타남

// function startTimer() {};
// function createElement() {};