
//gameboard module pattern


const displayManager = (function(){
    
    const message = document.querySelector('.message')

    function showCurrentPlayer(){
        const currentPlayer = playerController.getCurrentPlayer()
        document.querySelector('.player-text').textContent = currentPlayer
    }

    function showRound(){
        const round = playerController.getRound()
        document.querySelector('.round-text').textContent = round
    }

    function startGame(){
            const squareDivs = document.querySelectorAll('.boardContainer > div')
            squareDivs.forEach(square=> square.addEventListener('click', addToSquareOnClick))
            updateDisplay()        
    }

    function addToSquareOnClick(e){
        console.log(e.target);
        const currentPlayer = playerController.getCurrentPlayer()
        
        //translate index to coordinates
        const boardIndex = [
            [[0,0],[0,1],[0,2]],
            [[1,0],[1,1],[1,2]],
            [[2,0],[2,1],[2,2]]
        ]
        const SquareIndex = e.target.getAttribute('index') - 1
        const coords = boardIndex.flat(1)[SquareIndex]
        
        
        //check if square is occupied
        if(boardManager.addToGameBoard(currentPlayer, coords ) === 'Square Occupied'){
            message.textContent = 'Square Occupied'
            return
        } else{
            message.textContent = ' '
        }
        e.target.textContent = currentPlayer
        
        //check if winning pattern
        const result = playerController.scoreKeeper.checkWinningPattern()
        if(result){
            message.textContent = `Player ${currentPlayer} Wins!`
            removeBoardEventListeners()
            return
        }

        playerController.goToNextRound()
        const round = playerController.getRound()
        document.querySelector('.round-text').textContent = round
        document.querySelector('.player-text').textContent = currentPlayer

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
    return {updateDisplay, startGame, resetBoardDisplay}
})()




const boardManager = (function(){
    let gameBoardObject = new Array(3).fill("_").map((row)=> new Array(3))

    function returnGameBoard(){
        return gameBoardObject
    }

    function addToGameBoard(piece, location = [0,0]){
        const [row, column] = location
        if(gameBoardObject[row][column] !== 'X'
        && gameBoardObject[row][column] !== 'O')

        {
            gameBoardObject[row][column] = piece
            return gameBoardObject
        } else {
            return 'Square Occupied'
        }

    }
    
    function resetGameBoard(){
        gameBoardObject.map(row => {
            row.fill("_") 
               })
               console.log(gameBoardObject);
        return gameBoardObject
    }

    function createTestBoard(boardPattern){
        let pattern = boardPattern
        if(!pattern){
            pattern = prompt('enter pattern (hor, ver, diag)')
        } else {
            pattern = pattern
        }
        switch (pattern){
            case "hor":
                gameBoardObject = [
                    ["X","X","X"],
                    ["_","_","_"],
                    ["_","_","_"],
                ]
                break;
            case "ver":
                gameBoardObject = [
                    ["_","_","O"],
                    ["_","_","O"],
                    ["_","_","O"],
                ]
                break;
            case "diag":
                gameBoardObject = [
                    ["_","_","X"],
                    ["_","X","_"],
                    ["X","_","_"],
                ]
                break;
            case "rand":
                gameBoardObject = [
                    ["_","_","_"],
                    ["_","_","_"],
                    ["_","_","_"],
                ]
                Array(3).fill()

                break;
        }
        
     
        return gameBoardObject
    }

    return {returnGameBoard, addToGameBoard, resetGameBoard,createTestBoard}
})()

const playerController = (function(){
    let round = 1
    let currentPlayer = 'X'

    function goToNextRound(){
        round++
        currentPlayer === 'X' ? currentPlayer = 'O' : currentPlayer = 'X'
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
    function resetPlayerToX(){
        currentPlayer = 'X'
    }
    
    
    // double module pattern?
        
    const scoreKeeper = (function(){
        let scoreX = 0;
        let scoreO = 0;


        function saveTokens(...args){
            let tokenArray = args
            return tokenArray
        }
        let tokenArray = saveTokens('O','X')

   
        function checkWinningPattern(...args){
            let board 
            const conditionsArray = tokenArray
            // console.log({conditionsArray});

            board = boardManager.returnGameBoard()
            // board = boardManager.createTestBoard('diag')

            console.log({board});
            
                //Hor
            if( board.some(row => 
                row.join(',') === ['X','X','X'].join(',') 
                || row.join(',') === ['O','O','O'].join(','))){
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
        document.querySelector('.start-game').addEventListener('click', displayManager.startGame)
        document.querySelector('.reset-game').addEventListener('click', ()=>{ 
            boardManager.resetGameBoard()
            displayManager.resetBoardDisplay()
            resetRound()
            resetPlayerToX()
            displayManager.updateDisplay()

        })
    })()

    return {goToNextRound, getCurrentPlayer, scoreKeeper, getRound, resetPlayerToX}
})()