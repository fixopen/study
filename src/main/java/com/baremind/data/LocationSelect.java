package com.baremind.data;

public class LocationSelect {

	public String ToUserName;	//开发者微信号
	public String FromUserName;	//发送方帐号（一个OpenID）
	public int CreateTime;	//消息创建时间 （整型）
	public String MsgType;	//消息类型，event
	public String Event;	//事件类型，location_select
	public String EventKey;	//事件KEY值，由开发者在创建菜单时设定
	public String SendLocationInfo;	//发送的位置信息
	public String Location_X;	//X坐标信息
	public String Location_Y;	//Y坐标信息
	public String Scale;	//精度，可理解为精度或者比例尺、越精细的话 scale越高
	public String Label;	//地理位置的字符串信息
	public String Poiname;	//朋友圈POI的名字，可能为空
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
	public String getSendLocationInfo() {
		return SendLocationInfo;
	}
	public void setSendLocationInfo(String sendLocationInfo) {
		SendLocationInfo = sendLocationInfo;
	}
	public String getLocation_X() {
		return Location_X;
	}
	public void setLocation_X(String location_X) {
		Location_X = location_X;
	}
	public String getLocation_Y() {
		return Location_Y;
	}
	public void setLocation_Y(String location_Y) {
		Location_Y = location_Y;
	}
	public String getScale() {
		return Scale;
	}
	public void setScale(String scale) {
		Scale = scale;
	}
	public String getLabel() {
		return Label;
	}
	public void setLabel(String label) {
		Label = label;
	}
	public String getPoiname() {
		return Poiname;
	}
	public void setPoiname(String poiname) {
		Poiname = poiname;
	}
	
}
