let score = JSON.parse(localStorage.getItem('score'));
            if (score === null) {
                score = { 
                    wins: 0,
                    losses: 0,
                    tie: 0 
                };
            }

            updateScoreElement();

            let isAutoPlaying =  false;
            let intervalId;
            function autoplay(){
                if (!isAutoPlaying) {
                    intervalId = setInterval(function(){
                        const playerMove = pickComputerMove();
                        playGame(playerMove);
                    },1000);
                    isAutoPlaying = true;

                } else {
                    clearInterval(intervalId);
                    isAutoPlaying = false;
                }
            }

            
            function playGame(playerMove) {
                const computerMove = pickComputerMove();

                console.log(computerMove);

                let result = '';

                if (playerMove === 'scissors') {
                    if (computerMove === 'Rock') {
                        result = 'You loose';
                    }else if (computerMove === 'Paper') {
                        result = 'You win';
                    }else if (computerMove === 'Scissors'){
                        result = 'Tie';
                    }

                }else if (playerMove === 'paper') {
                    if (computerMove === 'Paper') {
                        result = 'Tie';
                    }else if (computerMove === 'Scissors') {
                        result = 'You loose';
                    }else if (computerMove === 'Rock'){
                        result = 'You win';
                    }
                    
                }else if (playerMove === 'rock') {
                    if (computerMove === 'Rock') {
                        result = 'Tie';
                    }else if (computerMove === 'Paper') {
                        result = 'You loose';
                    }else if (computerMove === 'Scissors'){
                        result = 'You win';
                    }
                    }

                    if (result === 'You win') {
                        score.wins++;
                    } else if (result === 'You loose') {
                        score.losses++;
                    } else if (result === 'Tie') {
                        score.tie++;
                    }

                    localStorage.setItem('score',JSON.stringify(score));

                    updateScoreElement();

                    document.querySelector('.js-move')
                    .innerHTML = `You 
                        <img src="images/${playerMove}.png"
                        class="move-icon">
                        <img src="images/${computerMove}.png"
                        class="move-icon">
                        Computer`;

                    document.querySelector('.js-result')
                    .innerHTML = result;
                    }

                    function updateScoreElement() {
                        document.querySelector('.js-score')
                             .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.tie}`;

                    }

            
            function pickComputerMove() {
                const randomNumber = Math.random();
                let computerMove ='';

                if (randomNumber >= 0 && randomNumber < 1/3) {
                    computerMove = 'Rock';
                }else if (randomNumber >= 1/3 && randomNumber < 2/3) {
                    computerMove = 'Paper';
                }else if (randomNumber >= 2/3 && randomNumber < 1) {
                    computerMove = 'Scissors';
                }
                return computerMove;
            }