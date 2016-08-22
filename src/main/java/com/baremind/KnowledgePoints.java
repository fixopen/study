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
import com.baremind.data.KnowledgePoint;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("knowledgePoints")
public class KnowledgePoints {
	@POST//添
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response createAdditionals(@CookieParam("sessionId") String sessionId, KnowledgePoint knowledgePoint) {
	        Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	        	knowledgePoint.setId(IdGenerator.getNewId());
	                EntityManager em = JPAEntry.getEntityManager();
	                em.getTransaction().begin();
	                em.persist(knowledgePoint);
                    em.getTransaction().commit();
                    result = Response.ok(knowledgePoint).build();
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
	            List<KnowledgePoint> knowledgePoint =  JPAEntry.getList(KnowledgePoint.class, filterObject);
	            result = Response.ok(new Gson().toJson(knowledgePoint)).build();
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
	            List<KnowledgePoint> knowledgePoint =  JPAEntry.getList(KnowledgePoint.class, filterObject);
	            result = Response.ok(new Gson().toJson(knowledgePoint)).build();
	        } else {
                result = Response.status(404).build();
            }
	        return result;
	}
	
	@PUT//根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, KnowledgePoint knowledgePoint) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<KnowledgePoint> knowledgePoints = JPAEntry.getList(KnowledgePoint.class, filterObject);
            if (knowledgePoints.size() == 1) {
            	KnowledgePoint existknowledgePoint = knowledgePoints.get(0);
            	int grade = knowledgePoint.getGrade();
            	if (grade != 0) {
            		existknowledgePoint.getGrade();
            	}
            	String storePath = knowledgePoint.getStorePath();
            	if(storePath!=null){
            		existknowledgePoint.setStorePath(storePath);
            	}
            	int order = knowledgePoint.getOrder();
            	if(order!=0){
            		existknowledgePoint.setOrder(order);
            	}
            	Long subjectId = knowledgePoint.getSubjectId();
            	if(sessionId!=null){
            		existknowledgePoint.setSubjectId(subjectId);
            	}
            	String title = knowledgePoint.getTitle();
            	if(title!=null){
            		existknowledgePoint.setTitle(title);
            	}
            	String videoUrl = knowledgePoint.getVideoUrl();
            	if(videoUrl!=null){
            		existknowledgePoint.setVideoUrl(videoUrl);
            	}
            	Long volumeId = knowledgePoint.getVolumeId();
            	if(volumeId!=null){
            		existknowledgePoint.setVolumeId(volumeId);
            	}
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existknowledgePoint);
                em.getTransaction().commit();
                result = Response.ok(existknowledgePoint).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
	}
}
