import json

class Node:
    def __init__(self, index, position, ids_nodes_adjacent):
        self.index = index
        self.position = position
        self.paths = []
        self.ids_nodes_adjacent = ids_nodes_adjacent
        self.nodes_adjacent = []
        self.routes = [[index]]
        self.state = True
        self.visited = False
        self.visited_reverse = False
    
    def clean_paths(self):
        self.paths = list(filter(self.min_distance, self.paths))
    
    def min_distance(self, path):
        min_distance = min([p[0] for p in self.paths]) if self.paths else None
        return path[0] == min_distance

def calculate_distance(position1, position2):
    return ((position1[0] - position2[0]) ** 2 + (position1[1] - position2[1]) ** 2) ** 0.5

def convert_json_to_node_objects(data):
    nodes = []
    for node in data:
        node_object = Node(node["id"], node["position"], node["ids_adjacents"])
        nodes.append(node_object)
    
    for node in nodes:
        node.nodes_adjacent = [nd for nd in nodes if nd.index in node.ids_nodes_adjacent]

    return nodes

def step(nodes):
    for node in nodes:
        for node_adjacent in node.nodes_adjacent:
            if node_adjacent.state:
                distance = calculate_distance(node.position, node_adjacent.position)
                path = [distance + node.paths[0][0], node] if node.paths else [distance, node]

                node_adjacent.paths.append(path)
                node_adjacent.clean_paths()

        node.visited = True
        node.state = False
    
    return list(set([node_adjacent for node in nodes for node_adjacent in node.nodes_adjacent if node_adjacent.state]))

def dijkstra(nodes, list_nodes):
    if all(node.visited for node in list_nodes):
        return
    dijkstra(step(nodes), list_nodes)

def search_route(nodes):
    for node in nodes:    
        nodes_previous = [path[1] for path in node.paths] if node.paths else []
        for node_previous in nodes_previous:
            node_previous.routes.clear()
            for route in node.routes:
                new_route = [node_previous.index] + route
                if new_route not in node_previous.routes:
                    node_previous.routes.append(new_route)

        node.visited_reverse = True

    return [path[1] for node in nodes for path in node.paths]
    
def search_routes(nodes):
    if not nodes[0].paths:
        nodes_adjacents = [node_adjacent for node_adjacent in nodes[0].nodes_adjacent if node_adjacent.visited_reverse]
        for node_adjacent in nodes_adjacents:
            for route in node_adjacent.routes:
                new_route = [nodes[0].index] + route
                if new_route not in nodes[0].routes:
                    nodes[0].routes.append(new_route)
        return
    return search_routes(search_route(nodes))

def send_routes_minime(node_start_id, node_end_id, nodes_list):
    #filename = './static/files/nodes_position.json'
    #with open(filename, 'r') as json_file:
    #    data = json.load(json_file)
    
    #nodes_list = convert_json_to_node_objects(data)[0]

    #node_start_id = 4
    node_start = [node for node in nodes_list if node.index == node_start_id]
    dijkstra(node_start, nodes_list)

    """for i, node in enumerate(nodes_list):
        tags = [[path[0]+1, path[1].index] for path in node.paths]
        print(f"Node {i+1} - tags: {tags}")"""

    #node_end_id = 4
    node_end = [node for node in nodes_list if node.index == node_end_id]
    search_routes(node_end)

    routes = []

    for i, route in enumerate(node_start[0].routes):
        print(f"Ruta {i}: {route}")
        routes.append(route)

    return routes