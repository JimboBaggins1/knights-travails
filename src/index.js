class Board {
    createBoard(rows = 8) {
        let board = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                board.push([i, j])
            }            
        }
        return board;
    }
}


class Graph {
    constructor(size) {
        this.size = size;
        this.sizeSquared = size * size;
        this.sqrtSize = Math.sqrt(size);
        this.adjMatrix = [];
        this.vertexData = [];
        this.validVertexes = [];
    }

    init() {
        // creates a 64x64 adjacency matrix
        for (let i = 0; i < this.sizeSquared; i++) {
            this.adjMatrix.push(0);
        }
        // creates an array of all squares on board, represented as coordinates
        for (let i = 0; i < this.sqrtSize; i++) {
            for (let j = 0; j < this.sqrtSize; j++) {
                this.vertexData.push([i, j]);
            }
        }
    }

    populateEdges() {
        // just for checking, in this case numEdges should be 336
        let numEdges = 0;
        // generates legal moves for each square on board
        this.vertexData.forEach(vertex => {
            let i, j;
            [i, j] = vertex;
            let legalMoves = [
                [i + 2, j + 1], 
                [i + 2, j - 1], 
                [i - 2, j + 1], 
                [i - 2, j - 1], 
                [i + 1, j + 2], 
                [i + 1, j - 2], 
                [i - 1, j + 2], 
                [i - 1, j - 2]
            ];
            // the currently selected square must be a legal move
            this.adjMatrix[this.vertexData.indexOf(vertex)] = 1;

            // check that each legal move is on the board, if it is, add to the adjacency matrix and increment numEdges
            legalMoves.forEach(variation => {
                console.log(vertex);
                if (variation[0] >= 0 && variation[0] < 8 && variation[1] >= 0 && variation[1] < 8 ) {
                    this.adjMatrix[this.getVertexFromCoords(variation)] = 1;
                    console.log(this.adjMatrix)
                    numEdges++;
                }
            })
        })

        // TODO: remove this - just for visualising adjMatrix
        let row = [];
        this.adjMatrix.forEach((square, index) => {
            if (index > 1 && index % (this.size - 1) === 0) {
                console.log(`${row}\n`);
                row = [];
            }
            row.push(square);
        })
        console.log(this.vertexData)
        console.log(numEdges);
    }

    // helper method to convert coordinate representation of square to numeric 0 - 63 value.
    getVertexFromCoords(coords) {
        for (let i = 0; i < this.vertexData.length; i++) {
            if (this.vertexData[i][0] === coords[0] && this.vertexData[i][1] === coords[1]) {
                return i;
            }
        }
        return -1;
    }
}



function knightMoves(start, end) {
    
}

let test = new Graph(64);
test.init();
test.populateEdges();