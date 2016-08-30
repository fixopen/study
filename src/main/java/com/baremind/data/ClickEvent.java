package com.baremind.data;

public class ClickEvent {

	public String ToUserName;//开发者微信号
	public String FromUserName;//发送方帐号（一个OpenID）
	public int CreateTime;//消息创建时间 （整型）
	public String MsgType;//消息类型，event
	public String Event;//事件类型，CLICK
	public String EventKey;//事件KEY值，与自定义菜单接口中KEY值对应
	public String getToUserName() {
		return ToUserName;
	}
	public void setToUserName(String toUserName) {
		ToUserName = toUserName;
	}
	public String getFromUserName() {
		return FromUserName;
	}
	public void setFromUserName(String fromUserName) {
		FromUserName = fromUserName;
	}
	public int getCreateTime() {
		return CreateTime;
	}
	public void setCreateTime(int createTime) {
		CreateTime = createTime;
	}
	public String getMsgType() {
		return MsgType;
	}
	public void setMsgType(String msgType) {
		MsgType = msgType;
	}
	public String getEvent() {
		return Event;
	}
	public void setEvent(String event) {
		Event = event;
	}
	public String getEventKey() {
		return EventKey;
	}
	public void setEventKey(String eventKey) {
		EventKey = eventKey;
	}
	
}
