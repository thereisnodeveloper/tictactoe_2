
const gameController = (function(){
    const dialog = document.querySelector('dialog')
    let formDataCount = 1
    let player1, player2
    let round = 1
    let currentPlayer
        
    //player object constructor
    const Player = function (token, name){
        this.token = token
        this.name = name
        this.score = 0
    }
    player1 = new Player('X','player1')
    player2 = new Player('O','player2')
    
    const getPlayers = function(){
        // console.log(player1, player2)
        return[player1, player2]
    }

    const displayManager = (function(){
        
        const message = document.querySelector('.message')

        
        const displayPlayerForm = function(evt){
            const dialog = document.querySelector('dialog')
            
            const playerText = document.createElement(`div`)
            playerText.classList.add('player-text')
            playerText.textContent = `${evt.target.textContent}`

            //if text exist, replace rather than add another one
            dialog.prepend(playerText)
            dialog.showModal()
            //disable ESC and clicking outside to close modal
            const preventEscapeKey = function(evt)  
            {  
                if(evt.key === 'Escape'){evt.preventDefault()}
                return
                }
            document.addEventListener('keydown',preventEscapeKey)             
            //disable button that pulled up form
            evt.target.removeEventListener("click", displayPlayerForm)
            evt.target.remove()
            }
        
        const createPlayerSelectButton = function(player){
            const selectPlayerButton = document.createElement('button')
            selectPlayerButton.textContent = player
            selectPlayerButton.addEventListener("click", displayPlayerForm)
            document.querySelector('.player-select').appendChild(selectPlayerButton)
            
            attachEListenerToForm()

            return 
        }
        

        const attachEListenerToForm = function (){
            document.querySelector('form').addEventListener('submit', resetForm)
            document.querySelector('form').addEventListener('submit', handleForm)
            document.querySelector('form').addEventListener('submit', processFormData)
        }

        
       const handleForm = function (evt){
            evt.preventDefault()        
            const dialog = document.querySelector('dialog')
            dialog.close()
            attachEListenerToForm()

        }
            //reset form
        const resetForm = function(){
        dialog.innerHTML = `
        <form action="?" method="post">
            <label for="player-name">Player Name: <input type="text"
            id="player-name" name="user-name" required></label>
            <label for="token"> Input Token (any one character) <input
            type="text" id="token" maxlength="1" name="user-token" required ></label>
            <button type="submit">Accept</button>
            </form>`            

        }

        const processFormData = function(evt){
            const data = new FormData(evt.target)           
            // const dataObject = Object.fromEntries(data.entries())
            const dataArray = [...data.entries()]
        
            const playerToken = dataArray[1][1];
            const playerName = dataArray[0][1];

            if (formDataCount === 1){
                formDataCount = 2
                player1.token = playerToken
                player1.name = playerName
                
                document.querySelector('.player-text').textContent = player1.name}
            else{
                player2.token = playerToken
                player2.name = playerName
                document.querySelector('.player-text').textContent = player2.name
            }
            return {playerToken, playerName}
        }

       


        function showCurrentPlayer(){
            const currentPlayer = gameController.getCurrentPlayer()
            document.querySelector('.player-text').textContent = currentPlayer.name
        }

        function showRound(){
            const round = gameController.getRound()
            document.querySelector('.round-text').textContent = round
        }

        function startGame(){
                const squareDivs = document.querySelectorAll('.boardContainer > div')
                squareDivs.forEach(square=> square.addEventListener('click', addToSquareOnClick))
                currentPlayer = getPlayers()[0]
                updateDisplay()        
                document.querySelector('.player-select').remove()
              
        }

        function addToSquareOnClick(e){
            const currentPlayer = gameController.getCurrentPlayer()
            
            //translate index to coordinates
            const boardIndex = [
                [[0,0],[0,1],[0,2]],
                [[1,0],[1,1],[1,2]],
                [[2,0],[2,1],[2,2]]
            ]
            console.log(boardIndex);
            const SquareIndex = e.target.getAttribute('index') - 1
            const coords = boardIndex.flat(1)[SquareIndex]
            
            
            //check if square is occupied
            if(boardManager.addToGameBoard(currentPlayer.token, coords ) === 'Square Occupied'){
                message.textContent = 'Square Occupied'
                return
            } else{
                message.textContent = ' '
            }
            e.target.textContent = currentPlayer.token
            
            //check if winning pattern
            const result = gameController.scoreKeeper.checkWinningPattern()
            if(result){
                message.textContent = `Player ${currentPlayer.name} Wins!`
                removeBoardEventListeners()
                return
            }

            gameController.goToNextRound()
            const round = gameController.getRound()
            document.querySelector('.round-text').textContent = round
            document.querySelector('.player-text').textContent = currentPlayer.name

            displayManager.updateDisplay()
            
        }

        

        function removeBoardEventListeners(){
            const boardElem = document.querySelector('.boardContainer')
            const boardClone = boardElem.cloneNode(true)
            //Both methods work
            // boardElem.parentElement.replaceChild(boardClone, boardElem)
            boardElem.replaceWith(boardClone)
        }


        function updateDisplay(){
            showRound()
            showCurrentPlayer()
            message.textContent = ' '
        }

        function resetBoardDisplay(){
            const squareDivs = document.querySelectorAll('.boardContainer > div')
                squareDivs.forEach(square=> square.textContent = '')

        }


        return {updateDisplay, startGame, resetBoardDisplay, createPlayerSelectButton, displayPlayerForm, player1,player2 }
    })()


    const boardManager = (function(){
        let gameBoardObject = new Array(3).fill(" ").map((row)=> new Array(3))

        function returnGameBoard(){
            return gameBoardObject
        }

        function addToGameBoard(piece, location = [0,0]){
            const [row, column] = location
            if(gameBoardObject[row][column] !== getPlayers()[0].token
            && gameBoardObject[row][column] !== getPlayers()[1].token)

            {
                gameBoardObject[row][column] = piece
                return gameBoardObject
            } else {
                return 'Square Occupied'
            }

        }
        
        function resetGameBoard(){
            gameBoardObject.map(row => {
                row.fill(" ") 
                })
                console.log(gameBoardObject);
            return gameBoardObject
        }

        // function createTestBoard(boardPattern){
        //     const p1 = getPlayers()[0].token
        //     console.log(p1);

        //     let pattern = boardPattern
        //     if(!pattern){
        //         pattern = prompt('enter pattern (hor, ver, diag)')
        //     } else {
        //         pattern = pattern
        //     }
        //     switch (pattern){
        //         case "hor":
        //             gameBoardObject = [
        //                 ["X","X","X"],
        //                 [" "," "," "],
        //                 [" "," "," "],
        //             ]
        //             break;
        //         case "ver":
        //             gameBoardObject = [
        //                 [" "," ","O"],
        //                 [" "," ","O"],
        //                 [" "," ","O"],
        //             ]
        //             break;
        //         case "diag":
        //             gameBoardObject = [
        //                 [" "," ","X"],
        //                 [" ","X"," "],
        //                 ["X"," "," "],
        //             ]
        //             break;
        //         case "rand":
        //             gameBoardObject = [
        //                 [" "," "," "],
        //                 [" "," "," "],
        //                 [" "," "," "],
        //             ]
        //             Array(3).fill()

        //             break;
        //     }
            
        
        //     return gameBoardObject
        // }

        return {returnGameBoard, addToGameBoard, resetGameBoard}//createTestBoard}
    })()

        
        function goToNextRound(){
            round++
            currentPlayer.name === getPlayers()[0].name ? currentPlayer = getPlayers()[1] : currentPlayer = getPlayers()[0]
            console.log(currentPlayer);
            return round
        }

        
        function getCurrentPlayer(){
            return currentPlayer
        }
            
        function getRound(){
            return round
        }
        function resetRound(){
            round = 1
        }
        function resetPlayerToP1(){
            currentPlayer = getPlayers()[0]
        }
        

        // double module pattern?
            
        const scoreKeeper = (function(){
            let player1Score = 0;
            let player2Score = 0;


            function saveTokens(...args){
                let tokenArray = args
                return tokenArray
            }



            let tokenArray = saveTokens(
                getPlayers()[0].token,
                getPlayers()[1].token
                )

    
            function checkWinningPattern(...args){
                let board 
                const conditionsArray = tokenArray
                // console.log({conditionsArray});

                board = boardManager.returnGameBoard()
                // board = boardManager.createTestBoard('diag')

                console.log({board});
                const [p1, p2] = getPlayers()
                const p1T = p1.token 
                const p2T = p2.token 

                    //Hor
                if( board.some(row => 
                    row.join(',') === [p1T,p1T,p1T].join(',') 
                    || row.join(',') === [p2T,p2T,p2T].join(','))){
                        return true
                    }
                

                    //Ver


                for(let col=0; col<3; col++){

                    let verticalArray = []

                    for(let row=0; row<3; row++){
                        verticalArray.push(board[row][col])
                    }
                    let rowResult = false; //check if there is a pttern match
                    
                    rowResult = 
                    conditionsArray.some(condition =>{
                        return verticalArray.every(cell => cell === condition)
                    })

                    if(rowResult){return rowResult}
                }            
            


                //Diag check
                
                let diagResult =
                conditionsArray.some(token => {
                    var patternResult;

                    //left-to-right Diag
                    for(let i=0; i<3; i++){
                        if(board[i][i] === token){ patternResult = true;
                        } else {
                            patternResult = false
                            break
                            }
                        }                
                        //skip right-to-left if left-right true
                    if (patternResult) return patternResult;
                    
                    //right-to-left Diag
                        // [0][2], [1][1], [0][0]
                    let arrayLastIndex = board[0].length - 1
                    for(let i=0; i<3; i++){
                        if(board[i][arrayLastIndex - i] === token){
                            patternResult = true;
                        } else {
                            patternResult = false
                            break
                            }
                    }
                    return  patternResult
                })
                
                return diagResult

            }

            return {checkWinningPattern}
        })()



        const initialize = (function(){
            const player1Button = displayManager.createPlayerSelectButton('Player 1')
            const player2Button = displayManager.createPlayerSelectButton('Player 2')
            document.querySelector('.start-game').addEventListener('click', displayManager.startGame)
            document.querySelector('.reset-game').addEventListener('click', ()=>{ 
                boardManager.resetGameBoard()
                displayManager.resetBoardDisplay()
                resetRound()
                resetPlayerToP1
                displayManager.updateDisplay()

            })
        })()

        return {goToNextRound, getCurrentPlayer, scoreKeeper, getRound, resetPlayerToP1, getPlayers}
})()