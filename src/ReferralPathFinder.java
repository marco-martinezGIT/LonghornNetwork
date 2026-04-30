import java.util.*;

public class ReferralPathFinder {
    private StudentGraph graph;

    public ReferralPathFinder(StudentGraph graph) {
        this.graph = graph;
    }

    public List<UniversityStudent> findReferralPath(UniversityStudent start, String targetCompany) {
        Map<UniversityStudent, Integer> dist = new HashMap<>();
        Map<UniversityStudent, UniversityStudent> prev = new HashMap<>();

        for (UniversityStudent s : graph.getAllNodes()) {
            dist.put(s, Integer.MAX_VALUE);
        }
        dist.put(start, 0);

        PriorityQueue<UniversityStudent> pq = new PriorityQueue<>(Comparator.comparingInt(s -> dist.getOrDefault(s, Integer.MAX_VALUE)));
        pq.add(start);

        Set<UniversityStudent> visited = new HashSet<>();

        while (!pq.isEmpty()) {
            UniversityStudent current = pq.poll();
            if (visited.contains(current)) continue;
            visited.add(current);

            for (StudentGraph.Edge edge : graph.getNeighbors(current)) {
                UniversityStudent neighbor = edge.neighbor;
                int cost = Math.max(0, 10 - edge.weight);
                int newDist = dist.get(current) + cost;
                if (newDist < dist.getOrDefault(neighbor, Integer.MAX_VALUE)) {
                    dist.put(neighbor, newDist);
                    prev.put(neighbor, current);
                    pq.add(neighbor);
                }
            }
        }

        UniversityStudent target = null;
        int minDist = Integer.MAX_VALUE;
        for (UniversityStudent s : graph.getAllNodes()) {
            if (s == start) continue;
            if (s.previousInternships.contains(targetCompany)) {
                int d = dist.getOrDefault(s, Integer.MAX_VALUE);
                if (d < minDist) {
                    minDist = d;
                    target = s;
                }
            }
        }

        if (target == null || minDist == Integer.MAX_VALUE) {
            return new ArrayList<>();
        }

        List<UniversityStudent> path = new ArrayList<>();
        for (UniversityStudent s = target; s != null; s = prev.get(s)) {
            path.add(0, s);
        }
        return path;
    }
}
