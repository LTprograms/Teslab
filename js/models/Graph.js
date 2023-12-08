class Graph {
    constructor() {
        this.vertices = [];
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.adjacencyList[vertex] = {};
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    changeWeight(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1][vertex2] = weight;
    }

    dijkstra(source) {
        let distances = {},
            parents = {},
            visited = new Set();
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.vertices[i] === source) {
                distances[source] = 0;
            } else {
                distances[this.vertices[i]] = Infinity;
            }
            parents[this.vertices[i]] = null;
        }
        
        let currVertex = this.vertexWithMinDistance(distances, visited);

        while (currVertex !== null) {
            let distance = distances[currVertex],
                neighbors = this.adjacencyList[currVertex];
            for (let neighbor in neighbors) {
                let newDistance = distance + neighbors[neighbor];
                if (distances[neighbor] > newDistance) {
                    distances[neighbor] = newDistance;
                    parents[neighbor] = currVertex;
                }
            }
            visited.add(currVertex);
            currVertex = this.vertexWithMinDistance(distances, visited);
        }

        console.log(parents);
        console.log(distances);
    }

    vertexWithMinDistance(distances, visited) {
        let minDistance = Infinity,
            minVertex = null;
        for (let vertex in distances) {
            let distance = distances[vertex];
            if (distance < minDistance && !visited.has(vertex)) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }

    translateData() {
        const elements = [];

        for (var i = 0; i < this.vertices.length; i++) {
        elements.push({ data: { id: this.vertices[i] } });
        }

        for (var i = 0; i < this.vertices.length; i++) {
            for (var j = i + 1; j <= this.vertices.length; j++) {
                const node1 = this.vertices[i];
                const node2 = this.vertices[j];
                elements.push({ data: { id: `edge(${node1})(${node2})`, source: node1, target: node2, weight: this.adjacencyList[node1][node2] } });
            }
        }
        console.log(elements)
        return elements;
    }

    printGraph() {
        const cy = cytoscape({
            container: document.getElementById('cy'),
            elements: this.translateData(),
            style: [
              {
                selector: 'node',
                style: {
                  /* 'background-color': function (ele) {
                      return ["node1", "node2"].includes(ele.data('id')) ? 'red' : 'blue'; // Asignar colores distintos a los nodos
                    }, */
                  'background-color': 'red',
                  'label': 'data(id)'
                }
              },
              {
                selector: 'edge',
                style: {
                  'width': 3,
                  /* 'line-color': function (ele) {
                    return (ele.source().id() === 'node1' && ele.target().id() === 'node2') ? 'red' : '#ccc';
                  }, */
                  'line-color': 'blue',
                  'target-arrow-color': '#ccc',
                  'target-arrow-shape': 'triangle',
                  'label': 'data(weight)'
                }
              }
            ]
          });
    }
}