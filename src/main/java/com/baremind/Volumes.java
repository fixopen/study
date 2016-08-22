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

import com.baremind.data.Session;
import com.baremind.data.Volume;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
@Path("volumes")
public class Volumes {
	@POST//添
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response createAdditionals(@CookieParam("sessionId") String sessionId, Volume volume) {
	        Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	        	volume.setId(IdGenerator.getNewId());
	                EntityManager em = JPAEntry.getEntityManager();
	                em.getTransaction().begin();
	                em.persist(volume);
                    em.getTransaction().commit();
                    result = Response.ok(volume).build();
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
		              filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {}.getType());
		          }
	            List<Volume> volumes =  JPAEntry.getList(Volume.class, filterObject);
	            result = Response.ok(new Gson().toJson(volumes)).build();
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
	            List<Volume> volumes =  JPAEntry.getList(Volume.class, filterObject);
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
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Volume volume) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Volume> volumes = JPAEntry.getList(Volume.class, filterObject);
            if (volumes.size() == 1) {
            	 Volume existvolume = volumes.get(0);
            	String title = volume.getTitle();
            	if (title != null) {
            		volume.setTitle(title);
            	}
            	int grade = volume.getGrade();
            	if (grade != 0) {
            		volume.setGrade(grade);
            	}
            	Long subjectId = volume.getSubjectId();
            	if(sessionId!=null){
            		volume.setSubjectId(subjectId);
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
