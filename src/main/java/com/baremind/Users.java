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

import com.baremind.data.Session;
import com.baremind.data.User;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
@Path("users")
public class Users {
	@POST//添
	@Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response createAdditionals(@CookieParam("sessionId") String sessionId, User user) {
	        Response result = Response.status(401).build();
	        if (JPAEntry.isLogining(sessionId)) {
	        	user.setId(IdGenerator.getNewId());
	                EntityManager em = JPAEntry.getEntityManager();
	                em.getTransaction().begin();
	                em.persist(user);
                    em.getTransaction().commit();
                    result = Response.ok(user).build();
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
	            List<User> users =  JPAEntry.getList(User.class, filterObject);
	            result = Response.ok(new Gson().toJson(users)).build();
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
	            List<User> users =  JPAEntry.getList(User.class, filterObject);
	            result = Response.ok(new Gson().toJson(users)).build();
	        } else {
                result = Response.status(404).build();
            }
	        return result;
	}
	
	@PUT//根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, User user) {
        Response result = Response.status(401).build();
        if (JPAEntry.isLogining(sessionId)) {
            Map<String, Object> filterObject = new HashMap<>(1);
            filterObject.put("id", id);
            List<User> users = JPAEntry.getList(User.class, filterObject);
            if (users.size() == 1) {
            	 User existuser = users.get(0);
            	 
            	String amount = user.getAmount();
            	if (amount != null) {
            		existuser.setAmount(amount);
            	}
            	Date birthday = user.getBirthday();
            	if (birthday != null) {
            		existuser.setBirthday(birthday);
            	}
            	String classname = user.getClassname();
            	if (classname != null) {
            		existuser.setClassname(classname);
            	}
            	Date createTime = user.getCreateTime();
            	if (createTime != null) {
            		existuser.setCreateTime(createTime);
            	}
            	String description = user.getDescription();
            	if (description != null) {
            		existuser.setDescription(description);
            	}
            	String email = user.getEmail();
            	if (email != null) {
            		existuser.setEmail(email);
            	}
            	String grade = user.getGrade();
            	if (grade != null) {
            		existuser.setGrade(grade);
            	}
            	String head = user.getHead();
            	if (head != null) {
            		existuser.setHead(head);
            	}
            	Boolean isAdministrator = user.getIsAdministrator();
            	if (isAdministrator != null) {
            		existuser.setIsAdministrator(isAdministrator);
            	}
            	String location = user.getLocation();
            	if (location != null) {
            		existuser.setLocation(location);
            	}
            	String loginName = user.getLoginName();
            	if (loginName != null) {
            		existuser.setLoginName(loginName);
            	}
            	String name = user.getName();
            	if (name != null) {
            		existuser.setName(name);
            	}
            	String password = user.getPassword();
            	if (password != null) {
            		existuser.setPassword(password);
            	}
            	String school = user.getSchool();
            	if (school != null) {
            		existuser.setSchool(school);
            	}
            	int sex = user.getSex();
            	if (sex != 0) {
            		existuser.setSex(sex);
            	}
            	String telephone = user.getTelephone();
            	if (telephone != null) {
            		existuser.setTelephone(telephone);
            	}
            	String timezone = user.getTimezone();
            	if (timezone != null) {
            		existuser.setTimezone(timezone);
            	}
            	Date updateTime = user.getUpdateTime();
            	if (updateTime != null) {
            		existuser.setUpdateTime(updateTime);
            	}
            	int site = user.getSite();
            	if(site!=0){
            		existuser.getSite();
            	}
                EntityManager em = JPAEntry.getEntityManager();
                em.getTransaction().begin();
                em.merge(existuser);
                em.getTransaction().commit();
                result = Response.ok(existuser).build();
            } else {
                result = Response.status(404).build();
            }
        }
        return result;
	}
}
