document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const gameContainer = document.getElementById('game-container');
    const audioFiles = ['sound1.mp3', 'sound2.mp3', 'sound3.mp3', 'sound4.mp3', 'sound5.mp3', 'sound6.mp3', 'sound7.mp3'];
    let sequence = [];
    let userSequence = [];
    let round = 1;
    let score = 0;

    startBtn.addEventListener('click', startGame);

    function startGame() {
        startBtn.disabled = true;
        gameContainer.innerHTML = '';
        sequence = [];
        userSequence = [];
        score = 0;
        playRound();
    }

    function generateSequence() {
        sequence = [];
        for (let i = 0; i < round; i++) {
            const randomIndex = Math.floor(Math.random() * audioFiles.length);
            sequence.push(randomIndex);
        }
    }

    function playRound() {
        updateDisplay(`Memorează secvența cu ${round} sunete...`);
        generateSequence();
        playSequence();
    }

    function playSequence() {
        let i = 0;
        const buttons = document.querySelectorAll('.audioBtn');

        function playNextButton() {
            if (i < sequence.length) {
                const currentIndex = sequence[i];
                highlightButton(currentIndex, () => {
                    playSound(currentIndex);
                    i++;
                    setTimeout(() => {
                        playNextButton();
                    }, 1000);
                });
            } else {
                setTimeout(() => {
                    gameContainer.innerHTML = '';
                    enableUserInput();
                }, 1000);
            }
        }

        playNextButton();
    }

    function highlightButton(index, callback) {
        const btn = createButton(index);
        btn.classList.add('highlight');
        gameContainer.innerHTML = '';
        gameContainer.appendChild(btn);

        setTimeout(() => {
            btn.classList.remove('highlight');
            if (callback) {
                callback();
            }
        }, 500);
    }

    function createButton(index) {
        const btn = document.createElement('button');
        btn.classList.add('audioBtn');
        btn.textContent = `Sunet ${index + 1}`;
        btn.addEventListener('click', function () {
            handleUserInput(index);
        });
        return btn;
    }

    function enableUserInput() {
        gameContainer.innerHTML = '';
        userSequence = [];

        audioFiles.forEach(function (audioFile, index) {
            const btn = createButton(index);
            gameContainer.appendChild(btn);
        });
    }

    function handleUserInput(selectedIndex) {
        userSequence.push(selectedIndex);
        playSound(selectedIndex);

        if (userSequence.length === sequence.length) {
            checkRound();
        }
    }

    function checkRound() {
        if (arraysEqual(sequence, userSequence)) {
            updateDisplay(`Corect! Ai câștigat un punct.`);
            score++;
        } else {
            updateDisplay(`Ai greșit! Scorul tău: ${score}.`);
            setTimeout(() => {
                updateDisplay('Apasă pe "Start Joc" pentru a încerca din nou.');
                startBtn.disabled = false;
            }, 2000);
        }
        round++;
        setTimeout(() => {
            playRound();
        }, 2000);
    }

    function updateDisplay(message) {
        gameContainer.innerHTML = `<p>${message}</p>`;
    }

    function playSound(index) {
        const audio = new Audio(audioFiles[index]);
        audio.play();
    }

    function arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }
});
