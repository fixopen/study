package com.baremind;

import com.baremind.data.ClickLink;
import com.baremind.data.LinkMessage;
import com.baremind.data.LocationInformation;
import com.baremind.data.ClickEvent;
import com.baremind.data.LocationSelect;
import com.baremind.data.PicSysphoto;
import com.baremind.data.PictureMessage;
import com.baremind.data.ScancodePush;
import com.baremind.data.TextMessage;
import com.baremind.data.VideoMessage;
import com.baremind.data.VoiceMeessage;
import com.baremind.data.WechatUser;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.json.Json;
import javax.persistence.EntityManager;
import javax.ws.rs.*;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Path("wechat-users")
public class WechatUsers {
	static String hostname = "https://api.weixin.qq.com";
	static String accesstoken = "";

	public static class GenericResult {
		public int code;
		public String message;
		public int menuid;
	}

	//自定义菜单查询接口
	private GenericResult getWechatServerIpList() {
		//https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN	//{"ip_list":["127.0.0.1","127.0.0.1"]}
		GenericResult result = new GenericResult();
		Client client = ClientBuilder.newClient();
		Response response = client.target(hostname)
				.path("/cgi-bin/get")
				.queryParam("access_token", accesstoken)
				.request().get();
		String responseBody = response.readEntity(String.class);
		if (responseBody.contains("\n")) {
			String[] lines = responseBody.split("\n");
			if (lines.length == 2) {
				String[] timeCode = lines[0].split(",");
				result.code = Integer.parseInt(timeCode[0]);
				result.message = timeCode[1];
			}
		}
		return result;
	}

	//自定义菜单创建接口
	private GenericResult createCustomMenu(Entity<?> menu) {
		//POST https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN       
		//{"errcode":0,"errmsg":"ok"}
		//{"errcode":40018,"errmsg":"invalid button name size"}
		Client client = ClientBuilder.newClient();
		Response response = client.target(hostname)
				.path("/cgi-bin/menu/create")
				.queryParam("access_token", accesstoken)
				.request().post(menu);
		String responseBody = response.readEntity(String.class);
		GenericResult r = null;
		return null;
	}

	//自定义菜单删除接口
	private GenericResult deleteCustomMenu() {
		//https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=ACCESS_TOKEN   
		//{"errcode":0,"errmsg":"ok"}
		//{"errcode":40018,"errmsg":"invalid button name size"}
		Client client = ClientBuilder.newClient();
		Response response = client.target(hostname)
				.path("/cgi-bin/menu/delete")
				.queryParam("access_token", accesstoken)
				.request().get();
		String responseBody = response.readEntity(String.class);
		GenericResult r = null;
		return null;
	}

	//创建个性化菜单
	private GenericResult cretePersonalityMenu(Entity<?> menu) {
		// https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=ACCESS_TOKEN

		//{"errcode":0,"errmsg":"ok"}
		//{"errcode":40018,"errmsg":"invalid button name size"}
		Client client = ClientBuilder.newClient();
		Response response = client.target(hostname)
				.path("/cgi-bin/menu/addconditional")
				.queryParam("access_token", accesstoken)
				.request().post(menu);
		String responseBody = response.readEntity(String.class);
		GenericResult r = null;
		return null;
	}

	//删除个性化菜单
	private GenericResult deletePersonalityMenu(Entity<?> menu) {
		// https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=ACCESS_TOKEN
		//{"errcode":0,"errmsg":"ok"}
		//{"errcode":40018,"errmsg":"invalid button name size"}
		Client client = ClientBuilder.newClient();
		Response response = client.target(hostname)
				.path("/cgi-bin/menu/delconditional")
				.queryParam("access_token", accesstoken)
				.request().post(menu);
		String responseBody = response.readEntity(String.class);
		GenericResult r = null;
		return null;
	}
	
	//点击菜单拉取消息时的事件推送
	@POST // 
	@Consumes(MediaType.APPLICATION_XML) 
	@Produces(MediaType.APPLICATION_JSON)
	public Response clickMenu(@CookieParam("sessionId") String sessionId, ClickEvent clickEvent) {
		//没有处理，记得要做处理
		return null;
	}
	
	//点击菜单跳转链接时的事件推送
		@POST // 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response clickLinkMenu(@CookieParam("sessionId") String sessionId, ClickLink clickLink) {
			//没有处理，记得要做处理
			return null;
		}

	//扫码推事件的事件推送
		@POST // 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response scancodePush(@CookieParam("sessionId") String sessionId, ScancodePush scancodePush) {
			//没有处理，记得要做处理
			return null;
		}
		
	//扫码推事件且弹出“消息接收中”提示框的事件推送
		@POST // 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response scancode_waitmsg(@CookieParam("sessionId") String sessionId, ScancodePush scancodePush) {
			//没有处理，记得要做处理
			return null;
		}
		
	//弹出系统拍照发图的事件推送
		@POST // 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response pic_sysphoto(@CookieParam("sessionId") String sessionId, PicSysphoto picSysphoto) {
			//没有处理，记得要做处理
			return null;
		}
		
	//弹出拍照或者相册发图的事件推送
		@POST // 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response pic_photo_or_album(@CookieParam("sessionId") String sessionId, PicSysphoto picSysphoto) {
			//没有处理，记得要做处理
			return null;
		}
				
	//：弹出微信相册发图器的事件推送
		@POST // 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response pic_weixin(@CookieParam("sessionId") String sessionId, PicSysphoto picSysphoto) {
			//没有处理，记得要做处理
			return null;
		}
				
	// 弹出地理位置选择器的事件推送
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response location_select(@CookieParam("sessionId") String sessionId, LocationSelect locationSelect) {
			//没有处理，记得要做处理
			return null;
		}
			

	//测试个性化菜单匹配结果
	private GenericResult testPersonalityMenu(Entity<?> menu) {
		//https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=ACCESS_TOKEN
		//{"errcode":0,"errmsg":"ok"}
		//{"errcode":40018,"errmsg":"invalid button name size"}
		Client client = ClientBuilder.newClient();
		Response response = client.target(hostname)
				.path("/cgi-bin/menu/trymatch")
				.queryParam("access_token", accesstoken)
				.request().post(menu);
		String responseBody = response.readEntity(String.class);
		GenericResult r = null;
		return null;
	}
	
	//获取自定义菜单配置接口
		private GenericResult testPersonalityMenu() {
			//https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=ACCESS_TOKEN//{"errcode":0,"errmsg":"ok"}
			//{"errcode":40018,"errmsg":"invalid button name size"}
			Client client = ClientBuilder.newClient();
			Response response = client.target(hostname)
					.path("/cgi-bin/get_current_selfmenu_info")
					.queryParam("access_token", accesstoken)
					.request().get();
			String responseBody = response.readEntity(String.class);
			GenericResult r = null;
			return null;
		}
		
	// 接受消息 ：文本消息
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response textmessage(@CookieParam("sessionId") String sessionId, TextMessage textMessage) {
			//没有处理，记得要做处理
			return null;
		}
	// 接受消息 ：图片消息
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response prcturemessage(@CookieParam("sessionId") String sessionId, PictureMessage pictureMessage) {
			//没有处理，记得要做处理
			return null;
		}

	// 接受消息 ：语音消息
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response voiceMeessage(@CookieParam("sessionId") String sessionId, VoiceMeessage voiceMeessage) {
			//没有处理，记得要做处理
			return null;
		}
		
	// 接受消息 ：视频消息
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response videoMessage(@CookieParam("sessionId") String sessionId, VideoMessage videoMessage) {
			//没有处理，记得要做处理
			return null;
		}

				
	// 接受消息 ：小视频消息
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response smallvoiceMeessage(@CookieParam("sessionId") String sessionId, VoiceMeessage voiceMeessage) {
			//没有处理，记得要做处理
			return null;
		}
	// 接受消息 ：地理位置消息
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response smallvoiceMeessage(@CookieParam("sessionId") String sessionId, LocationInformation locationInformation) {
			//没有处理，记得要做处理
			return null;
		}
	// 接受消息 ：链接消息
		@POST 
		@Consumes(MediaType.APPLICATION_XML) 
		@Produces(MediaType.APPLICATION_JSON)
		public Response smallvoiceMeessage(@CookieParam("sessionId") String sessionId, LinkMessage linkMessage) {
			//没有处理，记得要做处理
			return null;
		}


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
			List<WechatUser> wechatUsers =  JPAEntry.getList(WechatUser.class, filterObject);
			result = Response.ok(new Gson().toJson(wechatUsers)).build();
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
			List<WechatUser> wechatUsers =  JPAEntry.getList(WechatUser.class, filterObject);
			result = Response.ok(new Gson().toJson(wechatUsers)).build();
		} else {
			result = Response.status(404).build();
		}
		return result;
	}

	@PUT//根据id修改
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateAdditionals(@CookieParam("sessionId") String sessionId, @PathParam("id") Long id, WechatUser wechatUser) {
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
