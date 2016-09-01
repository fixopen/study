package com.baremind;

import com.baremind.data.Tag;
import com.baremind.data.WechatUser;
import com.baremind.utils.CharacterEncodingFilter;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Path("testers")
public class Testers {
    @POST //添
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response post(@CookieParam("sessionId") String sessionId) {
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

        Response result = Response.status(200).build();
        return result;
    }

    @GET //根据条件查询
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            result = Response.status(404).build();
            Map<String, Object> filterObject = CharacterEncodingFilter.getFilters(filter);
            List<Tag> tags = JPAEntry.getList(Tag.class, filterObject);
            if (!tags.isEmpty()) {
                result = Response.ok(new Gson().toJson(tags)).build();
            }
        }
        return result;
    }
}
