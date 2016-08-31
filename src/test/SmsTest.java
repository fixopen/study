import com.baremind.Users;
import com.baremind.WechatUsers;

/**
 * Created by fixopen on 29/8/2016.
 */
public class SmsTest {
    public static void main(String[] args) {
        String token = WechatUsers.getToken();
        Users.SendMessageResult r = Users.sendMessage("18810056729", "test valid code is 1432");
        System.out.printf("time: %s, code: %s, id: %s\n", r.time, r.code, r.messageId);
    }
//    public static void main(String[] args) {
//        Calendar ca = Calendar.getInstance();//创建一个日期实例
//        ca.setTime(new Date());//实例化一个日期
//        System.out.println(ca.get(Calendar.DAY_OF_YEAR));//获取是第多少天
//        System.out.println(ca.get(Calendar.WEEK_OF_YEAR));//获取是第几周
//        System.out.println(ca.get(Calendar.FEBRUARY));//获取是年
//    }
}
