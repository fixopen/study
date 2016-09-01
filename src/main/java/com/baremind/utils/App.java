package com.baremind.utils;
import com.baremind.*;
import org.glassfish.jersey.server.ResourceConfig;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by User on 2016/9/1.
 */
public class App extends ResourceConfig {
    public App() {
        registerClasses(Additionals.class, Cards.class, Comments.class, Devices.class,
            Images.class, KnowledgePoints.class, Likes.class, Medias.class,
            Problems.class, Properties.class, Schedulers.class, Sessions.class,
            Subjects.class, Tags.class, Testers.class, Users.class, Videos.class,
            Volumes.class, WechatUsers.class);
    }
}
