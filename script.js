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

    return {returnGameBoard, addToGameBoard, resetGameBoard}
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
    
    return {getMoveFromPlayer, goToNextRound, getCurrentPlayer}
})()