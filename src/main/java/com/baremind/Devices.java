package com.baremind;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.baremind.data.Additional;
import com.baremind.data.Device;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("devices")
public class Devices {
    @POST//添
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAdditionals(@CookieParam("sessionId") String sessionId, Device device) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            device.setId(IdGenerator.getNewId());
            EntityManager em = JPAEntry.getEntityManager();
            em.getTransaction().begin();
            em.persist(device);
            em.getTransaction().commit();
            result = Response.ok(device).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
    }

    @GET//根据条件查询
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAdditionals(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = null;
            if (filter != "") {
                String rawFilter = URLDecoder.decode(filter);
                filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
                }.getType());
            }
            List<Device> device = JPAEntry.getList(Device.class, filterObject);
            result = Response.ok(new Gson().toJson(device)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
    }

    @GET//根据条件查询
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAdditionalById(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Device> devices = JPAEntry.getList(Device.class, filterObject);
            result = Response.ok(new Gson().toJson(devices)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
    }

    @PUT//根据id修改
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Device device) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Device> devices = JPAEntry.getList(Device.class, filterObject);
            if (devices.size() == 1) {
                Device existdevice = devices.get(0);

                String platform = device.getPlatform();
                if (platform != null) {
                    existdevice.setPlatform(platform);
                }

                Long userId = device.getUserId();
                if (userId != null) {
                    existdevice.setUserId(userId);
                }

                String platformIdentity = device.getPlatformIdentity();
                if (platformIdentity != null) {
                    existdevice.setPlatformIdentity(platformIdentity);
                }

                String platformNotificationToken = device.getPlatformNotificationToken();
                if (platformNotificationToken != null) {
                    existdevice.setPlatformNotificationToken(platformNotificationToken);
                }
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existdevice);
                em.getTransaction().commit();
                result = Response.ok(existdevice).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
    }
}
