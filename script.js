//gameboard module pattern

const displayManager = (function(){
    

    function showCurrentPlayer(){
        const currentPlayer = playerController.getCurrentPlayer()
        document.querySelector('.player-text').textContent = currentPlayer
    }

    function showRound(){
        const round = playerController.getRound()
        document.querySelector('.round-text').textContent = round
    }

    function showBoard(){
        const board = boardManager.createTestBoard('ver')

        const flattenedBoard = board.flat()
        let cellIndex = 1;

        flattenedBoard.forEach(cell =>{

            const cellElement = document.querySelector(`[index="${cellIndex}"]`)
            cellElement.textContent = cell
            cellIndex++
        })
    }
    

    //TODO: let user click square to add token
    function addToSquareOnClick(e){
        console.log(e.target);
        
    }

    (function attachEventListeners(){
        document.addEventListener('click', addToSquareOnClick)
    })()

    function updateDisplay(){
        showBoard()
        showRound()
        showCurrentPlayer()
    }
    return {updateDisplay}
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

        {gameBoardObject[row][column] = piece

        return gameBoardObject
        } else {
            return 'Square Occupied'
        }

    }
    
    function resetGameBoard(){
        // gameBoardObject = new Array(3).fill(null).map((row)=> new Array(3))
        gameBoardObject.map(row => {
            row.fill("_") 
               })

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

    function getMoveFromPlayer(){
        const moveCoords = prompt('enter coordinates as "row,column" (i.e. 1,1 or 2,1)').split(",")
        boardManager.addToGameBoard(currentPlayer, moveCoords)
    }

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
    
    // double module pattern
        
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
            console.log({conditionsArray});

            // board = boardManager.returnGameBoard()
            board = boardManager.createTestBoard('diag')

            console.log({board});
            
                //Hor
            if( board.some(row => 
                row.toString() === ['X','X','X'].toString() 
                || row.toString() === ['O','O','O'].toString())){
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


    return {getMoveFromPlayer, goToNextRound, getCurrentPlayer, scoreKeeper, getRound}
})()