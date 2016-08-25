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

import com.baremind.data.Image;
import com.baremind.data.Session;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("sessions")
public class Sessions {
	@POST // 添
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createAdditionals(@CookieParam("sessionId") String sessionId, Session session) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			session.setId(IdGenerator.getNewId());
			EntityManager em = JPAEntry.getEntityManager();
			em.getTransaction().begin();
			em.persist(session);
			em.getTransaction().commit();
			result = Response.ok(session).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}

	@GET // 根据条件查询
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAdditionals(@CookieParam("sessionId") String sessionId,
			@QueryParam("filter") @DefaultValue("") String filter) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = null;
			if (filter != "") {
				String rawFilter = URLDecoder.decode(filter);
				filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
				}.getType());
			}
			List<Session> sessions = JPAEntry.getList(Session.class, filterObject);
			result = Response.ok(new Gson().toJson(sessions)).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}

	@GET // 根据条件查询
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAdditionalById(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<Session> sessions = JPAEntry.getList(Session.class, filterObject);
			result = Response.ok(new Gson().toJson(sessions)).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}

	@PUT // 根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id,
			Session session) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<Session> sessions = JPAEntry.getList(Session.class, filterObject);
			if (sessions.size() == 1) {
				Session existsession = sessions.get(0);

				String identity = session.getIdentity();
				if (identity != null) {
					existsession.setIdentity(identity);
				}
				Long userId = session.getUserId();
				if (userId != null) {
					existsession.setUserId(userId);
				}

				Long deviceId = session.getDeviceId();
				if (deviceId != null) {
					existsession.setDeviceId(deviceId);
				}

				String ip = session.getIp();
				if (ip != null) {
					existsession.setIp(ip);
				}

				Date lastOperationTime = session.getLastOperationTime();
				if (lastOperationTime != null) {
					existsession.setLastOperationTime(lastOperationTime);
				}

				EntityManager em = JPAEntry.getEntityManager();
				em.getTransaction().begin();
				em.merge(existsession);
				em.getTransaction().commit();
				result = Response.ok(existsession).build();
			} else {
				result = Response.status(404).build();
			}
		}
		return result;
	}
}
