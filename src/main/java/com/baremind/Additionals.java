package com.baremind;

import java.net.URLDecoder;
import java.util.Calendar;
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

import com.baremind.data.Additional;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

//GET .../entities/id
//GET .../entities?filter={"tablename":"111"}


@Path("additionals")
public class Additionals {
	
	@POST//添
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response createAdditionals(@CookieParam("sessionId") String sessionId, Additional additional) {
	        Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	        	 	additional.setId(IdGenerator.getNewId());
	                EntityManager em = JPAEntry.getEntityManager();
	                em.getTransaction().begin();
	                em.persist(additional);
                    em.getTransaction().commit();
                    result = Response.ok(additional).build();
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
	            List<Additional> additional =  JPAEntry.getList(Additional.class, filterObject);
	            result = Response.ok(new Gson().toJson(additional)).build();
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
	            List<Additional> additional =  JPAEntry.getList(Additional.class, filterObject);
	            result = Response.ok(new Gson().toJson(additional)).build();
	        } else {
                result = Response.status(404).build();
            }
	        return result;
	}
	
	@PUT//根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Additional additional) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Additional> additionals = JPAEntry.getList(Additional.class, filterObject);
            if (additionals.size() == 1) {
            	Additional existadditional = additionals.get(0);
            	
            	String name = additional.getName();
            	if (name != null) {
            		existadditional.setName(name);
            	}
            	Long objectId = additional.getObjectId();
            	if(objectId!=null){
            		existadditional.setObjectId(objectId);
            	}
            	String tableName = additional.getTableName();
            	if(tableName!=null){
            		existadditional.getTableName();
            	}
            	String value = additional.getValue();
            	if(value!=null){
            		existadditional.setValue(value);
            	}
            	existadditional.setObjectId(additional.getObjectId());
            	existadditional.setTableName(additional.getTableName());
            	existadditional.setValue(additional.getValue());
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existadditional);
                em.getTransaction().commit();
                result = Response.ok(existadditional).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
	}
	
}
