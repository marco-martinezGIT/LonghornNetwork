public class FriendRequestThread implements Runnable {
    private UniversityStudent sender;
    private UniversityStudent receiver;

    public FriendRequestThread(UniversityStudent sender, UniversityStudent receiver) {
        this.sender = sender;
        this.receiver = receiver;
    }

    @Override
    public void run() {
        UniversityStudent first = sender.name.compareTo(receiver.name) < 0 ? sender : receiver;
        UniversityStudent second = first == sender ? receiver : sender;

        synchronized (first) {
            synchronized (second) {
                sender.addFriend(receiver);
                receiver.addFriend(sender);
            }
        }
        System.out.println(sender.name + " sent a friend request to " + receiver.name);
    }
}
