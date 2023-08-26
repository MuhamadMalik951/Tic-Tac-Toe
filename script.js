document.addEventListener('DOMContentLoaded', function(){

    const nametwo = document.querySelector('.nametwo')
    const robot = document.querySelector('.robot')
    const back = document.querySelector('.back')
    const formButton = document.querySelector('.formbutton');
    const resetButton = document.querySelector('.resetbutton');
    const notvisible = document.querySelector('.notvisible')
    const whatmod = document.querySelector('.whatmod')
    const resetbtn = document.querySelector('.resetbtn')
    const winstatus = document.querySelector('.winstatus')
    const winstatuss = document.querySelector('.winstatuss')
    const nameone= document.querySelector('.nameone')
    const welcomeText = document.querySelector('.welcometext')
    const ployer = document.querySelector('.player')
    const human = document.querySelector('.human')
    const machine = document.querySelector('.machine')
    const namesForm = document.querySelector('.namesform');
    const gameStatus = document.querySelector('.gamestatus')
    const gridBox = document.querySelectorAll('.grid-box');
    const grid = document.querySelector('.cellcontainer');
    const contentcontainer = document.querySelector('.contentcontainer')
    const welcome = document.querySelector('.welcome')
    const startButton = document.querySelector(".gamestartbutton");
    const playerButton = document.querySelector('.playerbutton');
    const aiButton = document.querySelector('.ai-button');
    const intro = document.querySelector('.intro')
    const rightcontainer = document.querySelector('.rightcontainer')
    const container = document.querySelector('.container')

const displayController = (() => {

    startButton.addEventListener('click', function(){
        console.log("Start button ")
        startButton.style.opacity = '0';
        startButton.style.visibility = 'hidden';
        playerButton.style.opacity = '1';
        playerButton.style.visibility = 'visible';
        aiButton.style.opacity = '1';
        aiButton.style.visibility = 'visible';
        welcomeText.style.display = 'none';
        notvisible.style.display = 'flex';
        buttonListeners();
    }); 

    back.addEventListener('click', function(){
        container.style.display = 'none'
        playerButton.style.opacity = '1';
        playerButton.style.visibility = 'visible';
        playerButton.style.display = 'block';
        aiButton.style.display = 'block';
        aiButton.style.opacity = '1';
        aiButton.style.visibility = 'visible';
        notvisible.style.display = 'flex';
        whatmod.style.display = 'flex';
        buttonListeners();


        board = 
        ['','','',
        '','','',
        '','',''];

        gameOver = false;
        winstatus.textContent = ''
        winstatuss.textContent = ''
        gridBox.forEach((e,i) => {
        e.firstChild.textContent = '';
        }); 


    });

    const buttonListeners = () => {
        playerButton.addEventListener('click', function(e) {
            namesForm.style.opacity = '1';
            notvisible.style.display = 'none';
            namesForm.style.display = 'flex';
            gameBoard.createGame(e);
            namesForm.style.visibility = 'visible';
            whatmod.style.display = 'none';
            robot.setAttribute('src','./Assets/newww.png ')


        });
        aiButton.addEventListener('click', function(e) {
        
            gameBoard.createGame(e);
            notvisible.style.display = 'none';
            whatmod.style.display = 'none';
            robot.setAttribute('src','./Assets/icons8-robot-100.png')
        });
    };
    const displayTie = (gameOver) => {
        if(gameOver) {
            gameStatus.style.color = `orange`;
            console.log('board is full, its a tie!');
            winstatus.textContent =  'TIE'
            winstatuss.textContent = 'TIE'
        }
    }
    const displayWinner = (name,gameOver) => {
        if(gameOver) {
            if(name === 'bot'){
                
                winstatus.textContent = 'Winner'
                winstatuss.textContent = 'Loser'
            }
            else if(name !== 'bot') {
                if(name === nametwo.textContent ){
                winstatus.textContent = 'Winner'
                winstatuss.textContent = 'Loser';
                human.setAttribute('style','border: 2px solid #00ffff60;')

                
                }
                else if(name === nameone.textContent){
                    winstatuss.textContent = 'Winner';
                    winstatus.textContent = 'Loser';
                    machine.setAttribute('style','border: 2px solid #00ffff60;')

                }
            }

        }
    }

    return {displayTie, displayWinner, buttonListeners}
})();

const gameBoard = (() => {
    let board = ['','','',
                 '','','',
                 '','',''];
    let gameOver = false;
    let player1 = undefined
    let player2 = undefined
    let name1 = undefined;
    let name2 = undefined;

    const Player = (name, mark) => {



        let turn = false;
        function appendMark(index) {
            if(board[index] === '') {
                board[index] = mark;
                gridBox[index].firstChild.textContent = board[index];
                gridBox[index].classList.add('.cellcontainer>.box');

            }
        };

        

        function getScore() {
            if (
            board[0] === mark
            && board[1] === mark
            && board[2] === mark
            ||
            board[3] === mark 
            && board[4] === mark 
            && board[5] === mark
            ||
            board[6] === mark 
            && board[7] === mark 
            && board[8] === mark
            ||
            board[0] === mark
            && board[3] === mark
            && board[6] === mark
            ||
            board[1] === mark
            && board[4] === mark
            && board[7] === mark
            ||
            board[2] === mark
            && board[5] === mark
            && board[8] === mark
            ||
            board[0] === mark 
            && board[4] === mark 
            && board[8] === mark
            ||
            board[2] === mark 
            && board[4] === mark 
            && board[6] === mark
            ) {
                return 10;
            } else if(!board.includes('') && !gameOver) {
                return 0;
            }
        }

        function checkForWinner() {
            if(getScore()) {
                gameOver = true;
                displayController.displayWinner(name,gameOver);

            } else if (!board.includes('')) {
                gameOver = true;
                displayController.displayTie(gameOver);
            }
        }

        return {
            name,
            turn,
            mark,
            appendMark,
            checkForWinner,
            getScore
        };  
    };

    const displayBoard = () => {
        namesForm.style.display = 'none';
        resetButton.style.display = 'inline-block';
        playerButton.style.display = 'none';
        aiButton.style.display = 'none';
        grid.style.display = 'grid';
        rightcontainer.style.display = 'flex'
        container.style.display = 'flex'
        gameStatus.style.opacity = '1';
        gameStatus.style.visibility = 'visible';


    }

    const createGame = (button) => {
        if(button.target.className === 'playerbutton') {
            formButton.addEventListener('click', () => {
                if(namesForm[0].value === ''){
                    namesForm[0].value = 'Fry'
                }
                if(namesForm[1].value === ''){
                    namesForm[1].value = 'Zapp'
                }
                    name1 = namesForm[0].value;
                    name2 = namesForm[1].value;
                nameone.textContent = namesForm[0].value;
                nametwo.textContent = namesForm[1].value;
                robot.setAttribute('src','./Assets/newww.png')
                displayBoard();
                activate2PlayerMode();
            });     
        } else if(button.target.className === 'ai-button') {
            displayBoard();
            activateAiMode();
        }
    };

    const player1Turn = () => {
        player1.turn = true;
        player2.turn = false;
        gameStatus.textContent = `${player1.name} turn`;
    }

    const player2Turn = () => {
        player1.turn = false;
        player2.turn = true;
        gameStatus.textContent = `${player2.name} turn`;
    }

    const resetBoard = () => {
        board = ['','','',
                 '','','',
                 '','',''];

        gameOver = false;
        player1.turn = true;
        gameStatus.textContent = `${player1.name} turn`;
        winstatus.textContent = ''
        winstatuss.textContent = ''
        gridBox.forEach((e,i) => {
            e.firstChild.textContent = '';
        }); 
    }



    function minimax(b,depth,maximizingPlayer) {
        let playerScore = player1.getScore();
        let aiScore = player2.getScore();

        if(playerScore === 10) {
            return depth - playerScore;
        } else if(aiScore === 10) {
            return aiScore - depth; 
        } else if(playerScore === 0 || aiScore === 0) {
            return 0;
        }

        if (maximizingPlayer) {
            let best = -Infinity;
            b.forEach((e,i) => {
                if (e === '') {
                    b[i] = player2.mark;
                    let score = minimax(b,depth-1,false);
                    best = Math.max(best,score);
                    b[i] = '';
                }
            });
            return best;
        } else {
            let best = Infinity;
            b.forEach((e,i) => {
                if (e === '') {
                    b[i] = player1.mark;
                    let score = minimax(b,depth-1,true);
                    best = Math.min(best,score);
                    b[i] = '';
                }
            });
            return best;
        }
    }

    function findBestMove(b) {
        console.log('six')
        let bestVal = -Infinity;
        let bestMove = undefined;
        b.forEach(function(e,i) {
            if (e === '') {
                b[i] = player2.mark;
                let score = minimax(b,0,false);
                b[i] = '';
                if (score > bestVal) {
                    bestVal = score;
                    bestMove = i;
                }
            }
        });
        return player2.appendMark(bestMove);
    }
    




    function aiSmartPlay() {
        if(!gameOver && player2.turn && board.includes('')) {
            findBestMove(board)
            player1Turn();
            player2.checkForWinner();
        }
    }

    function activateAiMode() {
        player1 = Player('Your','X');
        player2 = Player('bot','O');
        player1Turn();
        gridBox.forEach((e,i) => {
            e.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[i] === '') {
                    player1.appendMark(i);
                    player2Turn();
                    player1.checkForWinner();
                    setTimeout(() => {
                        aiSmartPlay();
                    }, 600);
                } 
            }); 
        });
        back.addEventListener('clcik',function(){
            resetBoard();
        })
        resetButton.addEventListener('click', () => {
            resetBoard();
        });
        
    }

    
    function activate2PlayerMode() {
        player1 = Player(name1,'X');
        player2 = Player(name2,'O');
        player1Turn();
        gridBox.forEach((e,i) => {
            e.addEventListener("click", function(){  
                if(!gameOver && player1.turn && board[i] === '') {
                    player1.appendMark(i);
                    player2Turn();
                    player1.checkForWinner();
                } else if(!gameOver && player2.turn && board[i] === '') {
                    player2.appendMark(i);
                    player1Turn();
                    player2.checkForWinner();
                }
            }); 
        });
        back.addEventListener('click',function(){
            resetBoard();
        })
        resetButton.addEventListener('click', () => {
            resetBoard();
        });
    };

    return {createGame, resetBoard};
})();
})