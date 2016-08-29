package com.baremind;

import com.baremind.data.Volume;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.persistence.EntityManager;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("volumes")
public class Volumes {
    @POST//添
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createvolums(@CookieParam("sessionId") String sessionId, Volume volume) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            volume.setId(IdGenerator.getNewId());
            EntityManager em = JPAEntry.getEntityManager();
            em.getTransaction().begin();
            em.persist(volume);
            em.getTransaction().commit();
            result = Response.ok(volume).build();
        }
        return result;
    }

    @GET//根据条件查询
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVolums(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = null;
            if (filter != "") {
                String rawFilter = URLDecoder.decode(filter);
                filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
                }.getType());
            }
            List<Volume> volumes = JPAEntry.getList(Volume.class, filterObject);
            result = Response.ok(new Gson().toJson(volumes)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
    }

    @GET//根据id查询
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getVolumesById(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Volume> volumes = JPAEntry.getList(Volume.class, filterObject);
            result = Response.ok(new Gson().toJson(volumes)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
    }

    @PUT//根据id修改
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateVolumes(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Volume volume) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Volume> volumes = JPAEntry.getList(Volume.class, filterObject);
            if (volumes.size() == 1) {
                Volume existvolume = volumes.get(0);
                String title = volume.getTitle();
                if (title != null) {
                    existvolume.setTitle(title);
                }
                int grade = volume.getGrade();
                if (grade != 0) {
                    existvolume.setGrade(grade);
                }
                Long subjectId = volume.getSubjectId();
                if (sessionId != null) {
                    existvolume.setSubjectId(subjectId);
                }

                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existvolume);
                em.getTransaction().commit();
                result = Response.ok(existvolume).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
    }
}
