package com.baremind;

import java.net.URLDecoder;
import java.util.Date;
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

import com.baremind.data.Like;
import com.baremind.data.Session;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("likes")
public class Likes {
	@POST//添
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response createAdditionals(@CookieParam("sessionId") String sessionId, Like like) {
	        Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	        	like.setId(IdGenerator.getNewId());
	                EntityManager em = JPAEntry.getEntityManager();
	                em.getTransaction().begin();
	                em.persist(like);
                    em.getTransaction().commit();
                    result = Response.ok(like).build();
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
	            List<Like> likes =  JPAEntry.getList(Like.class, filterObject);
	            result = Response.ok(new Gson().toJson(likes)).build();
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
	            List<Like> likes =  JPAEntry.getList(Like.class, filterObject);
	            result = Response.ok(new Gson().toJson(likes)).build();
	        } else {
                result = Response.status(404).build();
            }
	        return result;
	}
	
	@PUT//根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Like like) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Like> likes = JPAEntry.getList(Like.class, filterObject);
            if (likes.size() == 1) {
            	Like existlike = likes.get(0);
            	
            	String objectType = like.getObjectType();
            	if (objectType != null) {
            		existlike.setObjectType(objectType);
            	}
            	Long userId = like.getUserId();
            	if (userId != null) {
            		existlike.setUserId(userId);
            	}
            	
            	Date createTime = like.getCreateTime();
            	if (createTime != null) {
            		existlike.setCreateTime(createTime);
            	}
            	
            	Long objectId = like.getObjectId();
            	if (objectId != null) {
            		existlike.setObjectId(objectId);
            	}
            	
            	
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existlike);
                em.getTransaction().commit();
                result = Response.ok(existlike).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
	}
}
