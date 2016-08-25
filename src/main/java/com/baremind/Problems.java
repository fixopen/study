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

import com.baremind.data.Problem;
import com.baremind.data.Session;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("problems")
public class Problems {

	@POST // 添
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createAdditionals(@CookieParam("sessionId") String sessionId, Problem problem) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			problem.setId(IdGenerator.getNewId());
			EntityManager em = JPAEntry.getEntityManager();
			em.getTransaction().begin();
			em.persist(problem);
			em.getTransaction().commit();
			result = Response.ok(problem).build();
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
			List<Problem> problems = JPAEntry.getList(Problem.class, filterObject);
			result = Response.ok(new Gson().toJson(problems)).build();
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
			List<Problem> problems = JPAEntry.getList(Problem.class, filterObject);
			result = Response.ok(new Gson().toJson(problems)).build();
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
			Problem problem) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<Problem> problems = JPAEntry.getList(Problem.class, filterObject);
			if (problems.size() == 1) {
				Problem existproblem = problems.get(0);

				String storePath = problem.getStorePath();
				if (storePath != null) {
					existproblem.setStorePath(storePath);
				}
				String title = problem.getTitle();
				if (title != null) {
					existproblem.setTitle(title);
				}
				Long knowledgePointId = problem.getKnowledgePointId();
				if (knowledgePointId != null) {
					existproblem.setKnowledgePointId(knowledgePointId);
				}
				String[] options = problem.getOptions();
				if (options != null) {
					existproblem.setOptions(options);
				}
				int order = problem.getOrder();
				if (order != 0) {
					existproblem.setOrder(order);
				}

				int[] standardAnswers = problem.getStandardAnswers();
				if (standardAnswers != null) {
					existproblem.setStandardAnswers(standardAnswers);
				}

				Long subjectId = problem.getSubjectId();
				if (subjectId != null) {
					existproblem.setSubjectId(subjectId);
				}

				String videoUrl = problem.getVideoUrl();
				if (videoUrl != null) {
					existproblem.setVideoUrl(videoUrl);
				}
				Long volumeId = problem.getVolumeId();
				if (volumeId != null) {
					existproblem.setVolumeId(volumeId);
				}
				EntityManager em = JPAEntry.getEntityManager();
				em.getTransaction().begin();
				em.merge(existproblem);
				em.getTransaction().commit();
				result = Response.ok(existproblem).build();
			} else {
				result = Response.status(404).build();
			}
		}
		return result;
	}
}
