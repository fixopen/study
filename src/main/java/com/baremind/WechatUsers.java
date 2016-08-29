package com.baremind;

import com.baremind.data.WechatUser;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.persistence.EntityManager;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baremind.data.Session;
import com.baremind.data.WechatUser;
import com.baremind.utils.IdGenerator;
import com.baremind.utils.JPAEntry;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
@Path("weachatUsers")
public class WechatUsers {
    private void getWechatServerIpList() {
        //GET https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=ACCESS_TOKEN
        //{"ip_list":["127.0.0.1","127.0.0.1"]}
    }

    private void createCustomMenu() {
        //POST https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
        /*
        参数 	是否必须 	说明
        button 	是 	一级菜单数组，个数应为1~3个
        sub_button 	否 	二级菜单数组，个数应为1~5个
        type 	是 	菜单的响应动作类型
        name 	是 	菜单标题，不超过16个字节，子菜单不超过40个字节
        key 	click等点击类型必须 	菜单KEY值，用于消息接口推送，不超过128字节
        url 	view类型必须 	网页链接，用户点击菜单可打开链接，不超过1024字节
        media_id 	media_id类型和view_limited类型必须 	调用新增永久素材接口返回的合法media_id
        */
        /*
        1、click：点击推事件
        用户点击click类型按钮后，微信服务器会通过消息接口推送消息类型为event	的结构给开发者（参考消息接口指南），并且带上按钮中开发者填写的key值，开发者可以通过自定义的key值与用户进行交互；
        2、view：跳转URL
        用户点击view类型按钮后，微信客户端将会打开开发者在按钮中填写的网页URL，可与网页授权获取用户基本信息接口结合，获得用户基本信息。
        3、scancode_push：扫码推事件
        用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者，开发者可以下发消息。
        4、scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框
        用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后，将扫码的结果传给开发者，同时收起扫一扫工具，然后弹出“消息接收中”提示框，随后可能会收到开发者下发的消息。
        5、pic_sysphoto：弹出系统拍照发图
        用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，同时收起系统相机，随后可能会收到开发者下发的消息。
        6、pic_photo_or_album：弹出拍照或者相册发图
        用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”。用户选择后即走其他两种流程。
        7、pic_weixin：弹出微信相册发图器
        用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器，并推送事件给开发者，同时收起相册，随后可能会收到开发者下发的消息。
        8、location_select：弹出地理位置选择器
        用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器，同时收起位置选择工具，随后可能会收到开发者下发的消息。
        9、media_id：下发消息（除文本消息）
        用户点击media_id类型按钮后，微信服务器会将开发者填写的永久素材id对应的素材下发给用户，永久素材类型可以是图片、音频、视频、图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
        10、view_limited：跳转图文消息URL
        用户点击view_limited类型按钮后，微信客户端将打开开发者在按钮中填写的永久素材id对应的图文消息URL，永久素材类型只支持图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
        */
        /*
        {
             "button":[
             {
                  "type":"click",
                  "name":"今日歌曲",
                  "key":"V1001_TODAY_MUSIC"
              },
              {
                   "name":"菜单",
                   "sub_button":[
                   {
                       "type":"view",
                       "name":"搜索",
                       "url":"http://www.soso.com/"
                    },
                    {
                       "type":"view",
                       "name":"视频",
                       "url":"http://v.qq.com/"
                    },
                    {
                       "type":"click",
                       "name":"赞一下我们",
                       "key":"V1001_GOOD"
                    }]
               }]
         }
         */
         /*
         {
            "button": [
                {
                    "name": "扫码",
                    "sub_button": [
                        {
                            "type": "scancode_waitmsg",
                            "name": "扫码带提示",
                            "key": "rselfmenu_0_0",
                            "sub_button": [ ]
                        },
                        {
                            "type": "scancode_push",
                            "name": "扫码推事件",
                            "key": "rselfmenu_0_1",
                            "sub_button": [ ]
                        }
                    ]
                },
                {
                    "name": "发图",
                    "sub_button": [
                        {
                            "type": "pic_sysphoto",
                            "name": "系统拍照发图",
                            "key": "rselfmenu_1_0",
                           "sub_button": [ ]
                         },
                        {
                            "type": "pic_photo_or_album",
                            "name": "拍照或者相册发图",
                            "key": "rselfmenu_1_1",
                            "sub_button": [ ]
                        },
                        {
                            "type": "pic_weixin",
                            "name": "微信相册发图",
                            "key": "rselfmenu_1_2",
                            "sub_button": [ ]
                        }
                    ]
                },
                {
                    "name": "发送位置",
                    "type": "location_select",
                    "key": "rselfmenu_2_0"
                },
                {
                   "type": "media_id",
                   "name": "图片",
                   "media_id": "MEDIA_ID1"
                },
                {
                   "type": "view_limited",
                   "name": "图文消息",
                   "media_id": "MEDIA_ID2"
                }
            ]
        }
        */
        //{"errcode":0,"errmsg":"ok"}
        //{"errcode":40018,"errmsg":"invalid button name size"}
    }

	@POST // 添
// origin/master
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
