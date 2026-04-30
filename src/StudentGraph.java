import java.util.*;

public class StudentGraph {

    public static class Edge {
        public UniversityStudent neighbor;
        public int weight;

        public Edge(UniversityStudent neighbor, int weight) {
            this.neighbor = neighbor;
            this.weight = weight;
        }
    }

    private Map<UniversityStudent, List<Edge>> adjacencyList;
    private List<UniversityStudent> nodes;

    public StudentGraph(List<UniversityStudent> students) {
        adjacencyList = new HashMap<>();
        nodes = new ArrayList<>(students);

        for (UniversityStudent s : students) {
            adjacencyList.put(s, new ArrayList<>());
        }

        for (int i = 0; i < students.size(); i++) {
            for (int j = i + 1; j < students.size(); j++) {
                UniversityStudent a = students.get(i);
                UniversityStudent b = students.get(j);
                int w = a.calculateConnectionStrength(b);
                if (w > 0) {
                    addEdge(a, b, w);
                }
            }
        }
    }

    public void addEdge(UniversityStudent a, UniversityStudent b, int weight) {
        adjacencyList.get(a).add(new Edge(b, weight));
        adjacencyList.get(b).add(new Edge(a, weight));
    }

    public List<Edge> getNeighbors(UniversityStudent student) {
        List<Edge> result = adjacencyList.get(student);
        if (result == null) return new ArrayList<>();
        return result;
    }

    public List<UniversityStudent> getAllNodes() {
        return new ArrayList<>(nodes);
    }

    public UniversityStudent getStudent(String name) {
        for (UniversityStudent s : nodes) {
            if (s.name.equals(name)) return s;
        }
        return null;
    }

    public void displayGraph() {
        System.out.println("Student Graph:");
        for (UniversityStudent s : nodes) {
            StringBuilder sb = new StringBuilder(s.name + " -> [");
            List<Edge> edges = adjacencyList.get(s);
            for (int i = 0; i < edges.size(); i++) {
                sb.append("(").append(edges.get(i).neighbor.name).append(", ").append(edges.get(i).weight).append(")");
                if (i < edges.size() - 1) sb.append(", ");
            }
            sb.append("]");
            System.out.println(sb.toString());
        }
    }
}
