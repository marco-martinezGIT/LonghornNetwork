import java.util.*;

public class PodFormation {
    private StudentGraph graph;
    private List<List<UniversityStudent>> pods;

    public PodFormation(StudentGraph graph) {
        this.graph = graph;
        this.pods = new ArrayList<>();
    }

    public void formPods(int podSize) {
        Set<UniversityStudent> visited = new HashSet<>();
        List<UniversityStudent> allNodes = graph.getAllNodes();

        for (UniversityStudent start : allNodes) {
            if (visited.contains(start)) continue;

            List<UniversityStudent> pod = new ArrayList<>();
            PriorityQueue<UniversityStudent> pq = new PriorityQueue<>(
                    Comparator.comparingInt((UniversityStudent s) -> getMaxEdgeWeight(s, visited)).reversed()
            );

            visited.add(start);
            pod.add(start);

            for (StudentGraph.Edge edge : graph.getNeighbors(start)) {
                if (!visited.contains(edge.neighbor)) {
                    pq.add(edge.neighbor);
                }
            }

            while (!pq.isEmpty() && pod.size() < podSize) {
                UniversityStudent next = pq.poll();
                if (visited.contains(next)) continue;

                visited.add(next);
                pod.add(next);

                for (StudentGraph.Edge edge : graph.getNeighbors(next)) {
                    if (!visited.contains(edge.neighbor)) {
                        pq.add(edge.neighbor);
                    }
                }
            }

            pods.add(pod);
        }

        printPods();
    }

    private int getMaxEdgeWeight(UniversityStudent s, Set<UniversityStudent> visited) {
        int max = 0;
        for (StudentGraph.Edge edge : graph.getNeighbors(s)) {
            if (visited.contains(edge.neighbor) && edge.weight > max) {
                max = edge.weight;
            }
        }
        return max;
    }

    private void printPods() {
        System.out.println("Pod Assignments:");
        for (int i = 0; i < pods.size(); i++) {
            StringBuilder sb = new StringBuilder("  Pod " + i + ": ");
            for (UniversityStudent s : pods.get(i)) {
                sb.append(s.name).append(", ");
            }
            System.out.println(sb.toString());
        }
    }

    public List<List<UniversityStudent>> getPods() {
        return pods;
    }
}
