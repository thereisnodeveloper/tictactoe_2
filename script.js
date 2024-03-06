//gameboard module pattern



const gameBoard = (function(){
    const gameBoardObject = [
        [,,],
        [,,],
        [,,]
    ]
    function returnGameBoard(){
        return gameBoardObject
    }

    function changeGameBoard(){
        return gameBoardObject
    }


    return {}
})()