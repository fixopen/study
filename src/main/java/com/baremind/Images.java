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
import com.baremind.data.Image;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("images")
public class Images {
	@POST // 添
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createAdditionals(@CookieParam("sessionId") String sessionId, Image image) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			image.setId(IdGenerator.getNewId());
			EntityManager em = JPAEntry.getEntityManager();
			em.getTransaction().begin();
			em.persist(image);
			em.getTransaction().commit();
			result = Response.ok(image).build();
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
			List<Image> images = JPAEntry.getList(Image.class, filterObject);
			result = Response.ok(new Gson().toJson(images)).build();
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
			List<Image> images = JPAEntry.getList(Image.class, filterObject);
			result = Response.ok(new Gson().toJson(images)).build();
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
			Image image) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<Image> images = JPAEntry.getList(Image.class, filterObject);
			if (images.size() == 1) {
				Image existimage = images.get(0);

				String ext = image.getExt();
				if (ext != null) {
					existimage.setName(ext);
				}

				Integer mainColor = image.getMainColor();
				if (mainColor != null) {
					existimage.getMainColor();
				}

				String mimeType = image.getMimeType();
				if (mimeType != null) {
					existimage.setMimeType(mimeType);
				}

				Long size = image.getSize();
				if (size != null) {
					existimage.setSize(size);
				}

				String storePath = image.getStorePath();
				if (storePath != null) {
					existimage.setStorePath(storePath);
				}

				String name = image.getName();
				if (name != null) {
					existimage.setName(name);
				}

				EntityManager em = JPAEntry.getEntityManager();
				em.getTransaction().begin();
				em.merge(existimage);
				em.getTransaction().commit();
				result = Response.ok(existimage).build();
			} else {
				result = Response.status(404).build();
			}
		}
		return result;
	}
}
