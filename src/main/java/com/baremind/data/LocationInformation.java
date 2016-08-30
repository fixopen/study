package com.baremind.data;

public class LocationInformation {

	public String ToUserName;//	开发者微信号
	public String FromUserName;//	发送方帐号（一个OpenID）
	public int CreateTime;//	消息创建时间 （整型）
	public String MsgType;	//location
	public String Location_X;	//地理位置维度
	public String Location_Y;	//地理位置经度
	public String Scale;	//地图缩放大小
	public String Label;	//地理位置信息
	public int MsgId;	//消息id，64位整型
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
	public int getMsgId() {
		return MsgId;
	}
	public void setMsgId(int msgId) {
		MsgId = msgId;
	}
	
	
}
