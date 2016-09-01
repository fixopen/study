import com.baremind.Users;
import com.baremind.WechatUsers;
import com.baremind.data.WechatUser;
import com.baremind.utils.JPAEntry;

import java.util.List;

/**
 * Created by fixopen on 29/8/2016.
 */
public class SmsTest {
    public static void main(String[] args) {
        String token = WechatUsers.getToken();
        //K6uxSk8E8n4R19D-imv_34NCnTuheDNp1Zb6Nh3g2hqSNLskCQg0-EHZb7B1O7iR5FXBOcNf99q1ZtBT0l36d96oRQpYoNTBCzG0N-94KAGCDWqlv6ItpOnyi5_CtZ8ELXYcAEAXJK
        //WechatUsers.setAccessToken("K6uxSk8E8n4R19D-imv_34NCnTuheDNp1Zb6Nh3g2hqSNLskCQg0-EHZb7B1O7iR5FXBOcNf99q1ZtBT0l36d96oRQpYoNTBCzG0N-94KAGCDWqlv6ItpOnyi5_CtZ8ELXYcAEAXJK");
        String nextOpenId = WechatUsers.getUserList("");
        while (nextOpenId != null) {
            nextOpenId = WechatUsers.getUserList(nextOpenId);
        }
        List<WechatUser> us = JPAEntry.getList(WechatUser.class, null);
        for (WechatUser u : us) {
            WechatUsers.getUserInfo(u);
        }
       // Users.SendMessageResult r = Users.sendMessage("18810056729", "test valid code is 1432");
        //Users.SendMessageResult r = Users.sendMessage("18810056729", "second code is 1432");
       // System.out.printf("time: %s, code: %s, id: %s\n", r.time, r.code, r.messageId);
    }
//    public static void main(String[] args) {
//        Calendar ca = Calendar.getInstance();//创建一个日期实例
//        ca.setTime(new Date());//实例化一个日期
//        System.out.println(ca.get(Calendar.DAY_OF_YEAR));//获取是第多少天
//        System.out.println(ca.get(Calendar.WEEK_OF_YEAR));//获取是第几周
//        System.out.println(ca.get(Calendar.FEBRUARY));//获取是年
//    }
}
