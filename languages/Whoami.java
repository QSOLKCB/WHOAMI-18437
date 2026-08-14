// WHOAMI-18437 / Java
// One class, one method, one identity, several ceremonial keywords.
public final class Whoami {
    private Whoami() {}

    public static String resolve() {
        return "TRENT";
    }

    public static void main(String[] args) {
        System.out.println(resolve());
    }
}
