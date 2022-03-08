let playButton = document.querySelector(".start_button");
let player1Trigger = document.querySelector(".player__1_shooter_trigger");
let player2Trigger = document.querySelector(".player__2_shooter_trigger");
let player1Score = document.querySelector(".player__1_score");
let player2Score = document.querySelector(".player__2_score");
let player1Bullet = document.querySelector(".player__1_bullet");
let player2Bullet = document.querySelector(".player__2_bullet");
let player1Health = document.querySelector(".player__1_health");
let player2Health = document.querySelector(".player__2_health");
let playStatus = document.querySelector('.play_status')

class Player {
    constructor() {
        this.health = 5
        this.score = 0
    }
    resetScore() {
        this.score = 0
    }
    updateScore() {
        this.score += 1
    }
    updateHealth(bulletCount) {
        this.health -= bulletCount
        return this.health
    }
    resetHealth() {
        this.health = 5
        return this.health
    }
}

player1 = new Player()
player2 = new Player()


function resetHealth() {
    player1Health.innerHTML = player1.resetHealth();
    player2Health.innerHTML = player2.resetHealth();
}

function toggleTriggers() {
    player1Trigger.toggleAttribute('disabled');
    player2Trigger.toggleAttribute('disabled');
}

function disableTriggers() {
    player1Trigger.disabled = true;
    player2Trigger.disabled = true;
}

function resetScores() {
    player1.score = 0
    player2.score = 0
}

function winnerCheck() {
    if(player1.score !=3 && player2.score !=3) {
        return
    }
    if (player1.score == 3) {
        displayStatus('Player One Won This Match')
    }
    if (player2.score == 3) {
        displayStatus('Player Two Won This Match')
    }
    playButton.innerHTML = 'Restart Game'
    print(player1,player2)
    resetScores()
    player1Score.innerHTML = player1.score
    player2Score.innerHTML = player2.score
}

function displayStatus(status) {
    playStatus.innerHTML = status
    setTimeout(() => {
        playStatus.innerHTML = ''
    }, 1000);
    
}

function startGame() {
    playStatus.innerHTML = ''
    player1Trigger.disabled = false;
    player2Trigger.disabled = true;
    playButton.toggleAttribute('disabled')
}

player1Trigger.addEventListener("click", function () {
    let bulletCount = Math.floor(Math.random() * 6);
    player1Bullet.style.animation = `player1_bullet 0.5s ease-in 0s ${bulletCount}`;
    setTimeout(function () {
        player2Health.innerHTML = player2.updateHealth(bulletCount);
        player1Bullet.style.animation = "";
        toggleTriggers()
        if (player2.health <= 0) {
            displayStatus('Player 1 won this round')
            player1.updateScore()
            player1Score.innerHTML = player1.score;
            playButton.innerHTML = 'Start Next Round'
            playButton.toggleAttribute('disabled')
            resetHealth()
            disableTriggers()
            winnerCheck()
        }
    }, 500 * bulletCount);
});

player2Trigger.addEventListener("click", function () {
    let bulletCount = Math.floor(Math.random() * 6);
    player2Bullet.style.animation = `player2_bullet 0.5s ease-in 0s ${bulletCount}`;
    setTimeout(async function () {
        player1Health.innerHTML = player1.updateHealth(bulletCount);
        toggleTriggers()
        player2Bullet.style.animation = "";
        if (player1.health <= 0) {
            displayStatus('player 2 won this round')
            player2.updateScore()
            player2Score.innerHTML = player2.score;
            playButton.innerHTML = 'Start Next Round'
            playButton.toggleAttribute('disabled')
            resetHealth()
            disableTriggers()
            winnerCheck()
        }
    }, 500 * bulletCount);
});
    
playButton.addEventListener("click", function(){
    startGame()
});


