import com.baremind.Users;

/**
 * Created by fixopen on 29/8/2016.
 */
public class SmsTest {
    public static void main(String[] args) {
        Users.SendMessageResult r = Users.sendMessage("18810056729", "test valid code is 1432");
        System.out.printf("time: %s, code: %s, id: %s\n", r.time, r.code, r.messageId);
    }
}
