//gameboard module pattern



const boardManager = (function(){
    let gameBoardObject = new Array(3).fill("").map((row)=> new Array(3))

    function returnGameBoard(){
        return gameBoardObject
    }

    function addToGameBoard(piece, location = [0,0]){
        const [row, column] = location
        gameBoardObject[row][column] = piece
        return gameBoardObject
    }
    
    function resetGameBoard(){
        // gameBoardObject = new Array(3).fill(null).map((row)=> new Array(3))
        gameBoardObject.map(row => {
            row.fill("") 
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
                    ["","",""],
                    ["","",""],
                ]
                break;
            case "ver":
                gameBoardObject = [
                    ["","X",""],
                    ["","X",""],
                    ["","",""],
                ]
                break;
            case "diag":
                gameBoardObject = [
                    ["X","",""],
                    ["","X",""],
                    ["","","X"],
                ]
                break;
            case "rand":
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
        
    const scoreKeeper = function(){
        let scoreX = 0;
        let scoreO = 0;
        //TODO: check winning patterns
        function checkWinningPattern(){
            let board 
            board = boardManager.createTestBoard("hor")
            // if(
            //     //Hor
            // return board.some(row => 
            //     row.toString() === ['X','X','X'].toString() 
            //     || row.toString() === ['O','O','O'].toString())

            //     //Ver
            board = boardManager.createTestBoard("ver")
            console.log(board);
                for(let y=0; y<2; y++){
                    if(
                    board[0][y] === board[1][y] 
                    && board[1][y] === board[2][y] 
                    ){
                        return true
                    }else{
                        return false
                    }
                }
                //diag
                
            //     ){
            //     return true
            // } else{
            //     return false
            // }

        
            //Vertical
            // board = boardManager.createTestBoard("ver")
            // return board.
            //Diagonal
        }

        return checkWinningPattern()
    }


    return {getMoveFromPlayer, goToNextRound, getCurrentPlayer, scoreKeeper}
})()