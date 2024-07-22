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
        return this.vertexData = Array.from({ length: 64}, (_, i) => i);
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

    // adjacency list methods
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

// test script
let test = new Graph();
test.init();
test.buildAdjList();
console.log(test.vertexData)
test.levelOrderSearch([0, 0], [3, 3])