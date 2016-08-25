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

import com.baremind.data.Card;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
@Path("cards")
public class Cards {
	@POST//添
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response createCards(@CookieParam("sessionId") String sessionId, Card card) {
	        Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	        		card.setId(IdGenerator.getNewId());
	                EntityManager em = JPAEntry.getEntityManager();
	                em.getTransaction().begin();
	                em.persist(card);
                    em.getTransaction().commit();
                    result = Response.ok(card).build();
	            } else {
	                result = Response.status(404).build();
	            }
	        return result;
	    }

	@GET//根据条件查询
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCards(@CookieParam("sessionId") String sessionId, @QueryParam("filter") @DefaultValue("") String filter) {
		 Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	            Map<String, Object> filterObject = null;
	            if (filter != "") {
		              String rawFilter = URLDecoder.decode(filter);
		              filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {}.getType());
		          }
	            List<Cards> cards =  JPAEntry.getList(Cards.class, filterObject);
	            result = Response.ok(new Gson().toJson(cards)).build();
	        } else {
                result = Response.status(404).build();
            }
	        return result;
	}

	@GET//根据条件查询
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCards(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id) {
		 Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	            Map<String, Object> filterObject = new HashMap<>(1);
	            filterObject.put("id", id);
	            List<Card> cards =  JPAEntry.getList(Card.class, filterObject);
	            result = Response.ok(new Gson().toJson(cards)).build();
	        } else {
                result = Response.status(404).build();
            }
	        return result;
	}
	
	@PUT//根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Card card) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Card> cards = JPAEntry.getList(Card.class, filterObject);
            if (cards.size() == 1) {
            	Card existcard = cards.get(0);
            	
            	String duration = existcard.getDuration();
            	if (duration != null) {
            		existcard.setDuration(duration);
            	}
            	
            	Date activeTime = existcard.getActiveTime();
            	if(activeTime!=null){
            		existcard.getActiveTime();
            	}
            	
            	Date endTime = existcard.getEndTime();
            	if(endTime!=null){
            		existcard.setEndTime(endTime);
            	}
            	
            	String no = existcard.getNo();
            	if(no!=null){
            		existcard.setNo(no);
            	}
            	
            	String password = existcard.getPassword();
            	if(password!=null){
            		existcard.setPassword(password);
            	}
            	
            	Long subject = existcard.getSubject();
            	if(subject!=null){
            		existcard.setSubject(subject);
            	}
            	
            	Long userId = existcard.getUserId();
            	if(userId!=null){
            		existcard.setUserId(userId);
            	}
            	
            	Double amount = existcard.getAmount();
            	if(amount!=null){
            		existcard.setAmount(amount);
            	}
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existcard);
                em.getTransaction().commit();
                result = Response.ok(existcard).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
	}
}
