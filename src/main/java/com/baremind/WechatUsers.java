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
import com.baremind.data.WechatUser;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Path("weachatUsers")
public class WechatUsers {
	@POST // 添
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createAdditionals(@CookieParam("sessionId") String sessionId, WechatUser wechatUser) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			wechatUser.setId(IdGenerator.getNewId());
			EntityManager em = JPAEntry.getEntityManager();
			em.getTransaction().begin();
			em.persist(wechatUser);
			em.getTransaction().commit();
			result = Response.ok(wechatUser).build();
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
			List<WechatUser> wechatUsers = JPAEntry.getList(WechatUser.class, filterObject);
			result = Response.ok(new Gson().toJson(wechatUsers)).build();
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
			List<WechatUser> wechatUsers = JPAEntry.getList(WechatUser.class, filterObject);
			result = Response.ok(new Gson().toJson(wechatUsers)).build();
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
			WechatUser wechatUser) {
		Response result = Response.status(401).build();
		if (JPAEntry.isLogining(sessionId)) {
			Map<String, Object> filterObject = new HashMap<>(1);
			filterObject.put("id", id);
			List<WechatUser> wechatUsers = JPAEntry.getList(WechatUser.class, filterObject);
			if (wechatUsers.size() == 1) {
				WechatUser existwechatUser = wechatUsers.get(0);
				String city = wechatUser.getCity();
				if (city != null) {
					existwechatUser.setCity(city);
				}
				String country = wechatUser.getCountry();
				if (country != null) {
					existwechatUser.setCity(city);
				}
				Date expiry = wechatUser.getExpiry();
				if (expiry != null) {
					existwechatUser.setExpiry(expiry);
				}
				String head = wechatUser.getHead();
				if (head != null) {
					existwechatUser.setHead(head);
				}
				String info = wechatUser.getInfo();
				if (info != null) {
					existwechatUser.setInfo(info);
				}
				String nickname = wechatUser.getNickname();
				if (nickname != null) {
					existwechatUser.setNickname(nickname);
				}
				String openId = wechatUser.getOpenId();
				if (openId != null) {
					existwechatUser.setOpenId(openId);
				}
				String[] privilege = wechatUser.getPrivilege();
				if (privilege != null) {
					existwechatUser.setPrivilege(privilege);
				}
				String province = wechatUser.getProvince();
				if (province != null) {
					existwechatUser.setProvince(province);
				}
				String refId = wechatUser.getRefId();
				if (refId != null) {
					existwechatUser.setRefId(refId);
				}
				String refreshToken = wechatUser.getRefreshToken();
				if (refreshToken != null) {
					existwechatUser.setRefreshToken(refreshToken);
				}
				Long sex = wechatUser.getSex();
				if (sex != null) {
					existwechatUser.setSex(sex);
				}
				String token = wechatUser.getToken();
				if (token != null) {
					existwechatUser.setToken(token);
				}
				String unionId = wechatUser.getUnionId();
				if (unionId != null) {
					existwechatUser.setUnionId(unionId);
				}
				Long userId = wechatUser.getUserId();
				if (userId != null) {
					existwechatUser.setUnionId(unionId);
				}
				EntityManager em = JPAEntry.getEntityManager();
				em.getTransaction().begin();
				em.merge(existwechatUser);
				em.getTransaction().commit();
				result = Response.ok(existwechatUser).build();
			} else {
				result = Response.status(404).build();
			}
		}
		return result;
	}
}
