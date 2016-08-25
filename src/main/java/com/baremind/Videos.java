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
import com.baremind.data.Video;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("videos")
public class Videos {
	@POST // 添
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createAdditionals(@CookieParam("sessionId") String sessionId, Video video) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			video.setId(IdGenerator.getNewId());
			EntityManager em = JPAEntry.getEntityManager();
			em.getTransaction().begin();
			em.persist(video);
			em.getTransaction().commit();
			result = Response.ok(video).build();
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
			List<Video> videos = JPAEntry.getList(Video.class, filterObject);
			result = Response.ok(new Gson().toJson(videos)).build();
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
			List<Video> videos = JPAEntry.getList(Video.class, filterObject);
			result = Response.ok(new Gson().toJson(videos)).build();
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
			Video video) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<Video> videos = JPAEntry.getList(Video.class, filterObject);
			if (videos.size() == 1) {
				Video existvideo = videos.get(0);

				String ext = video.getExt();
				if (ext != null) {
					existvideo.setExt(ext);
				}

				String mimeType = video.getMimeType();
				if (mimeType != null) {
					existvideo.setMimeType(mimeType);
				}

				Long size = video.getSize();
				if (size != null) {
					existvideo.setSize(size);
				}

				String name = video.getName();
				if (name != null) {
					existvideo.setName(name);
				}

				String storePath = video.getStorePath();
				if (storePath != null) {
					existvideo.setStorePath(storePath);
				}

				int duration = video.getDuration();
				if (duration != 0) {
					existvideo.setDuration(duration);
				}

				Double bitRate = video.getBitRate();
				if (bitRate != null) {
					existvideo.setBitRate(bitRate);
				}
				EntityManager em = JPAEntry.getEntityManager();
				em.getTransaction().begin();
				em.merge(existvideo);
				em.getTransaction().commit();
				result = Response.ok(existvideo).build();
			} else {
				result = Response.status(404).build();
			}
		}
		return result;
	}
}
