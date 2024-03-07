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
                //FIXME:
                gameBoardObject = [
                    ["","","O"],
                    ["","","O"],
                    ["","","O"],
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

    // double module pattern
        
    const scoreKeeper = (function(){
        let scoreX = 0;
        let scoreO = 0;
        //TODO: check winning patterns
        function checkWinningPattern(...args){
            let board 
            board = boardManager.createTestBoard("hor")
            // if(
            //     //Hor
            // return board.some(row => 
            //     row.toString() === ['X','X','X'].toString() 
            //     || row.toString() === ['O','O','O'].toString())

            //     //Ver
            board = boardManager.createTestBoard("ver")
            console.log({board});
            // const conditionsArray = [
            //     // cell === 'X',
            //     // cell === 'O'
            // ]

             const conditionsArray = args

            // conditionsArray.push('cell' === token1)
            console.log({conditionsArray});

            //FIXME: figure out the double loop
            for(let col=0; col<3; col++){
                //reset verticalArray

                let verticalArray = []

                for(let row=0; row<3; row++){
                    // if(
                    //     //TODO: accommodate a list of allowable pre-defined tokens
               
                    verticalArray.push(board[row][col])
                }
                console.log({verticalArray});
                let rowResult = false; //check if there is a pttern match
                
                rowResult = 
                conditionsArray.some(condition =>{
                    return verticalArray.every(cell => cell === condition)
                })
                console.log({rowResult});

                if(rowResult){return rowResult}

            }            
           
            return false
        }

        return {checkWinningPattern}
    })()


    return {getMoveFromPlayer, goToNextRound, getCurrentPlayer, scoreKeeper}
})()