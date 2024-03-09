//gameboard module pattern



const boardManager = (function(){
    let gameBoardObject = new Array(3).fill(null).map((row)=> new Array(3))

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
        gameBoardObject.map(element => {
            element.fill(null) 
               })

        return gameBoardObject
    }

    function createTestBoard(){
        let pattern = prompt('enter pattern (hor, ver, diag)')
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
                    ["X","",""],
                    ["X","",""],
                    ["X","",""],
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