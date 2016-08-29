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

import com.baremind.data.Media;
import com.baremind.data.Problem;
import com.baremind.data.Session;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("medias")
public class Medias {
	@POST//添
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response createAdditionals(@CookieParam("sessionId") String sessionId, Media media) {
	        Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	        	media.setId(IdGenerator.getNewId());
	                EntityManager em = JPAEntry.getEntityManager();
	                em.getTransaction().begin();
	                em.persist(media);
                    em.getTransaction().commit();
                    result = Response.ok(media).build();
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
	            List<Media> medias =  JPAEntry.getList(Media.class, filterObject);
	            result = Response.ok(new Gson().toJson(medias)).build();
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
	            List<Media> medias =  JPAEntry.getList(Media.class, filterObject);
	            result = Response.ok(new Gson().toJson(medias)).build();
	        } else {
                result = Response.status(404).build();
            }
	        return result;
	}
	
	@PUT//根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Media media) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Media> medias = JPAEntry.getList(Media.class, filterObject);
            if (medias.size() == 1) {
            	 Media existmedia = medias.get(0);
            	 
            	String ext = media.getExt();
            	if (ext != null) {
            		existmedia.setExt(ext);
            	}
            	
            	String mimeType = media.getMimeType();
            	if (mimeType != null) {
            		existmedia.setMimeType(mimeType);
            	}
            	
            	String name = media.getName();
            	if (name != null) {
            		existmedia.setName(name);
            	}
            	
            	Long size = media.getSize();
            	if (size != null) {
            		existmedia.setSize(size);
            	}
            	
            	String storePath = media.getStorePath();
            	if (storePath != null) {
            		existmedia.setStorePath(storePath);
            	}
            	
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existmedia);
                em.getTransaction().commit();
                result = Response.ok(existmedia).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
	}
}
