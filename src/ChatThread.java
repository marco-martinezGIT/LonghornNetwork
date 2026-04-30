public class ChatThread implements Runnable {
    private UniversityStudent sender;
    private UniversityStudent receiver;
    private String message;

    public ChatThread(UniversityStudent sender, UniversityStudent receiver, String message) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }

    @Override
    public void run() {
        String formatted = sender.name + ": " + message;

        UniversityStudent first = sender.name.compareTo(receiver.name) < 0 ? sender : receiver;
        UniversityStudent second = first == sender ? receiver : sender;

        synchronized (first) {
            synchronized (second) {
                sender.addChat(receiver.name, formatted);
                receiver.addChat(sender.name, formatted);
            }
        }
        System.out.println(sender.name + " sent a message to " + receiver.name + ": " + message);
    }
}
