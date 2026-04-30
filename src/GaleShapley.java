import java.util.*;

public class GaleShapley {

    public static void assignRoommates(List<UniversityStudent> students) {
        Map<String, UniversityStudent> nameMap = new HashMap<>();
        for (UniversityStudent s : students) {
            nameMap.put(s.name, s);
        }

        Map<UniversityStudent, Integer> nextProposal = new HashMap<>();
        for (UniversityStudent s : students) {
            nextProposal.put(s, 0);
        }

        Queue<UniversityStudent> freeStudents = new LinkedList<>();
        for (UniversityStudent s : students) {
            if (!s.roommatePreferences.isEmpty()) {
                freeStudents.add(s);
            }
        }

        while (!freeStudents.isEmpty()) {
            UniversityStudent proposer = freeStudents.poll();

            if (proposer.getRoommate() != null) continue;

            int idx = nextProposal.get(proposer);
            if (idx >= proposer.roommatePreferences.size()) continue;

            String targetName = proposer.roommatePreferences.get(idx);
            nextProposal.put(proposer, idx + 1);

            UniversityStudent target = nameMap.get(targetName);
            if (target == null) {
                freeStudents.add(proposer);
                continue;
            }

            if (target.getRoommate() == null) {
                proposer.setRoommate(target);
                target.setRoommate(proposer);
            } else {
                UniversityStudent current = target.getRoommate();
                int targetRankProposer = target.roommatePreferences.indexOf(proposer.name);
                int targetRankCurrent = target.roommatePreferences.indexOf(current.name);

                boolean prefersProposer;
                if (targetRankProposer == -1) {
                    prefersProposer = false;
                } else if (targetRankCurrent == -1) {
                    prefersProposer = true;
                } else {
                    prefersProposer = targetRankProposer < targetRankCurrent;
                }

                if (prefersProposer) {
                    current.setRoommate(null);
                    proposer.setRoommate(target);
                    target.setRoommate(proposer);
                    freeStudents.add(current);
                } else {
                    freeStudents.add(proposer);
                }
            }
        }
    }
}
