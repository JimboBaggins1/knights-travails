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


// class Graph {
//     constructor(size) {
//         this.size = size;
//         this.sizeSquared = size * size;
//         this.sqrtSize = Math.sqrt(size);
//         this.adjMatrix = [];
//         this.vertexData = [];
//         this.validVertexes = [];
//     }

//     init() {
//         // creates a 64x64 adjacency matrix
//         for (let i = 0; i < this.sizeSquared; i++) {
//             this.adjMatrix.push(0);
//         }
//         // creates an array of all squares on board, represented as coordinates
//         for (let i = 0; i < this.sqrtSize; i++) {
//             for (let j = 0; j < this.sqrtSize; j++) {
//                 this.vertexData.push([i, j]);
//             }
//         }
//     }

//     populateEdges() {
//         // just for checking, in this case numEdges should be 336
//         let numEdges = 0;
//         // generates legal moves for each square on board
//         this.vertexData.forEach(vertex => {
//             let i, j;
//             [i, j] = vertex;
//             let legalMoves = [
//                 [i + 2, j + 1], 
//                 [i + 2, j - 1], 
//                 [i - 2, j + 1], 
//                 [i - 2, j - 1], 
//                 [i + 1, j + 2], 
//                 [i + 1, j - 2], 
//                 [i - 1, j + 2], 
//                 [i - 1, j - 2]
//             ];
//             // the currently selected square must be a legal move
//             this.adjMatrix[this.vertexData.indexOf(vertex)] = 1;

//             // check that each legal move is on the board, if it is, add to the adjacency matrix and increment numEdges
//             legalMoves.forEach(variation => {
//                 console.log(vertex);
//                 if (variation[0] >= 0 && variation[0] < 8 && variation[1] >= 0 && variation[1] < 8 ) {
//                     this.adjMatrix[this.getVertexFromCoords(variation)] = 1;
//                     console.log(this.adjMatrix)
//                     numEdges++;
//                 }
//             })
//         })

//         // TODO: remove this - just for visualising adjMatrix
//         let row = [];
//         this.adjMatrix.forEach((square, index) => {
//             if (index > 1 && index % (this.size - 1) === 0) {
//                 console.log(`${row}\n`);
//                 row = [];
//             }
//             row.push(square);
//         })
//         console.log(this.vertexData)
//         console.log(numEdges);
//     }

//     // graph traversal algorithm
//     dijkstra(startData, endData) {
//         // startData and endData will be supplied as coords, need to convert to single numeric value
//         const start = this.getVertexFromCoords(startData);
//         const end = this.getVertexFromCoords(endData);
//         // initialise distances as infinite
//         let distances = Array(this.size).fill(Infinity);
//         // array to store predecessors. Used to show path from start to end
//         let predecessors = [];
//         distances[start] = 0;
//         let visited = Array(this.size).fill(false);

//         for (let i = 0; i < this.size; i++) {
//             let minDist = Infinity;
//             let u = null;
//             for (let j = 0; j < this.size; j++) {
//                 if (visited[j] === false && distances[j] < minDist) {
//                     minDist = distances[j];
//                     u = j;
//                 }
//             }

//             if (!u || u === end) {
//                 console.log(`Breaking out of loop. Current vertex: ${this.vertexData[u]}.\n Distances: ${distances}`);
//                 break;
//             }

//             visited[u] = true;
//             console.log('Visited vertex:', this.vertexData[u]);
//             for (let v = 0; v < this.size; v++) {
//                 if (this.adjMatrix[u][v] !== 0 && visited[v] === false) {
//                     console.log(this.adjMatrix[u][v]);
//                     let alt = distances[u] + this.adjMatrix[u][v];
//                     if (alt < distances[v]) {
//                         distances[v] = alt;
//                         predecessors[v] = u
//                     }
//                 }
//             }
//         }
//         return distances[end]
//     }

//     // helper method to convert coordinate representation of square to numeric 0 - 63 value.
//     getVertexFromCoords(coords) {
//         for (let i = 0; i < this.vertexData.length; i++) {
//             if (this.vertexData[i][0] === coords[0] && this.vertexData[i][1] === coords[1]) {
//                 return i;
//             }
//         }
//         return -1;
//     }
// }



// function knightMoves(start, end) {
    
// }

// let test = new Graph(64);
// test.init();
// test.populateEdges();
// test.dijkstra([0, 5], [6, 7]);

class Graph {
    constructor() {
        this.size = 64;
        this.sqrtSize = Math.sqrt(this.size);
        this.adjacencyList = new Map();
        this.vertexData = [];
    }

    convertToCoords(node) {
        const i = Math.floor(node / this.sqrtSize);
        const j = node % this.sqrtSize;
        return [i, j];
    }

    convertFromCoords(coords) {
        const i = coords[0] * this.sqrtSize;
        const j = coords[1];

        return i + j;
    }

    init() {
        // for (let i = 0; i < this.sqrtSize; i++) {
        //     for (let j = 0; j < this.sqrtSize; j++) {
        //         this.vertexData.push([i, j]);
        //     }
        // }
        for (let i = 0; i < this.size; i++) {
            this.vertexData.push(i);
        }
    }

    getLegalMoves(node) {
        let i, j;
        [i, j] = node;
        const possibleMovesArr = [
            [i + 2, j + 1],
            [i + 2, j - 1],
            [i - 2, j + 1],
            [i - 2, j - 1],
            [i + 1, j + 2],
            [i + 1, j - 2],
            [i - 1, j + 2],
            [i - 1, j - 2]
        ];
        let legalMoves = [];
        possibleMovesArr.forEach(move => {
            if (move[0] >= 0 && move[0] <= 7 && move[1] >= 0 && move[1] <= 7) {
                legalMoves.push(move);
            }
        })
        return legalMoves;
    }

    buildAdjList() {
        this.vertexData.forEach(vertex => {
            if (!this.adjacencyList.has(vertex)) this.addNode(vertex);
            const legalMoves = this.getLegalMoves(this.convertToCoords(vertex));
            legalMoves.forEach(move => {
                const convertedMove = this.convertFromCoords(move)
                if (!this.adjacencyList.has(convertedMove)) this.addNode(convertedMove);
                this.addEdge(vertex, convertedMove);
                // console.log(vertex);
                // console.log(this.convertFromCoords(move));
            })
        })
        return this.adjacencyList;
    }


    levelOrderSearch(start, end) {
        let queue = [];
        let previous = [];
        let visited = Array(this.size).fill(false);

        // convert coords to nums
        let startNode = this.convertFromCoords(start);
        let endNode = this.convertFromCoords(end);
        
        // input validity checks
        if (startNode === endNode) {
            console.log('Start square same as end square - please enter two different squares.');
            return;
        }
        if (startNode < 0 || startNode > 63 || endNode < 0 || endNode > 63) {
            console.log(`Invalid coordinates.`);
            return;
        }

        // traverse graph
        visited[startNode] = true;
        queue.push(startNode);
        console.log(visited)
        console.log(queue)
        while (queue.length !== 0) {
            const currentNode = queue.shift();
            if (currentNode === endNode) break;
            let neighbours = this.getNeighbours(currentNode);
            neighbours.forEach(node => {
                if (!visited[node]) {
                    visited[node] = true;
                    queue.push(node);
                    previous[node] = currentNode;
                }
            })
        }

        // reconstruct path
        let outputPath = [];
        outputPath.push(this.convertToCoords(endNode));
        let nextStep = previous[endNode];
        while (nextStep !== startNode) {
            outputPath.push(this.convertToCoords(nextStep));
            nextStep = previous[nextStep];
        }
        outputPath.push(this.convertToCoords(startNode));
        const outputReversed = outputPath.reverse();
        const result = outputReversed.map(value => `[${value}]`).join(" -> ")
        console.log('You made it in ', outputPath.length - 1, ' steps.\nPath: ', result);
        return result;
    }
    addNode(node) {
        this.adjacencyList.set(node, new Set());
    }

    addEdge(node1, node2) {
        this.adjacencyList.get(node1).add(node2);
        this.adjacencyList.get(node2).add(node1);
    }

    getNeighbours(node) {
        return this.adjacencyList.get(node);
    }

    hasEdge(node1, node2) {
        return this.adjacencyList.get(node1).has(node2);
    }
}

let test = new Graph();

// test.addNode('a');
// test.addNode('b');
// test.addEdge('a', 'b');

// console.log(test.getNeighbours('a'));
// console.log(test.convertToCoords(63))

test.init();
console.log(test.vertexData);
console.log(test.convertFromCoords([7,7]));
test.buildAdjList();
console.log(test.adjacencyList);