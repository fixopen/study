package com.baremind.utils;
import com.baremind.*;

import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by User on 2016/9/1.
 */
public class App extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> classes = new HashSet<Class<?>>();
        classes.add(Additionals.class);
        classes.add(Cards.class);
        classes.add(Comments.class);
        classes.add(Devices.class);
        classes.add(Images.class);
        classes.add(KnowledgePoints.class);
        classes.add(Likes.class);
        classes.add(Medias.class);
        classes.add(Problems.class);
        classes.add(Properties.class);
        classes.add(Schedulers.class);
        classes.add(Sessions.class);
        classes.add(Subjects.class);
        classes.add(Tags.class);
        classes.add(Testers.class);
        classes.add(Users.class);
        classes.add(Videos.class);
        classes.add(WechatUsers.class);
        classes.add(Volumes.class);
        return classes;
    }
}
