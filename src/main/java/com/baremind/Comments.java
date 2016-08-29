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

import com.baremind.data.Additional;
import com.baremind.data.Comment;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("comments")
public class Comments {
    @POST//添
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAdditionals(@CookieParam("sessionId") String sessionId, Comment comment) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            comment.setId(IdGenerator.getNewId());
            EntityManager em = JPAEntry.getEntityManager();
            em.getTransaction().begin();
            em.persist(comment);
            em.getTransaction().commit();
            result = Response.ok(comment).build();
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
                filterObject = new Gson().fromJson(rawFilter, new TypeToken<Map<String, Object>>() {
                }.getType());
            }
            List<Comment> comments = JPAEntry.getList(Comment.class, filterObject);
            result = Response.ok(new Gson().toJson(comments)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
    }

    @GET//根据id查询
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAdditionalById(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Comment> comments = JPAEntry.getList(Comment.class, filterObject);
            result = Response.ok(new Gson().toJson(comments)).build();
        } else {
            result = Response.status(404).build();
        }
        return result;
    }

    @PUT//根据id修改
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, Comment comment) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<Comment> comments = JPAEntry.getList(Comment.class, filterObject);
            if (comments.size() == 1) {
                Comment existComment = comments.get(0);

                String clientId = comment.getClientId();
                if (clientId != null) {
                    existComment.setClientId(clientId);
                }

                Long objectId = comment.getObjectId();
                if (objectId != null) {
                    existComment.setObjectId(objectId);
                }

                String objectType = comment.getObjectType();
                if (objectType != null) {
                    existComment.setObjectType(objectType);
                }

                String content = comment.getContent();
                if (content != null) {
                    existComment.setContent(content);
                }

                Date createTime = comment.getCreateTime();
                if (createTime != null) {
                    existComment.setCreateTime(createTime);
                }

                Date updateTime = comment.getUpdateTime();
                if (updateTime != null) {
                    existComment.setUpdateTime(updateTime);
                }

                Long userId = comment.getUserId();
                if (userId != null) {
                    existComment.setUserId(userId);
                }

                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existComment);
                em.getTransaction().commit();
                result = Response.ok(existComment).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
    }
}
