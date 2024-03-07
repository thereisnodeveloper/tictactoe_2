//gameboard module pattern



const boardManager = (function(){
    const gameBoardObject = new Array(3).fill(null).map((row)=> new Array(3))

    function returnGameBoard(){
        return gameBoardObject
    }

    function addToGameBoard(piece, location = [0,0]){
        const [row, column] = location
        gameBoardObject[row][column] = piece
        return gameBoardObject
    }
    
    function resetGameBoard(){
        gameBoardObject.forEach((row)=>{
            row.forEach((cell)=>{
                cell = null
            })
        })
        return gameBoardObject
    }

    return {returnGameBoard, addToGameBoard, resetGameBoard}
})()