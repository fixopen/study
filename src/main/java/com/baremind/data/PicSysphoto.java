package com.baremind.data;

public class PicSysphoto {

	public String ToUserName;//	开发者微信号
	public String FromUserName;//	发送方帐号（一个OpenID）
	public int CreateTime;//	消息创建时间 （整型）
	public String MsgType;//	消息类型，event
	public String Event;//	事件类型，pic_sysphoto
	public String EventKey;//	事件KEY值，由开发者在创建菜单时设定
	public String SendPicsInfo;//	发送的图片信息
	public String Count;//	发送的图片数量
	public String PicList;//	图片列表
	public String PicMd5Sum;//	图片的MD5值，开发者若需要，可用于验证接收到图片
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
	public String getSendPicsInfo() {
		return SendPicsInfo;
	}
	public void setSendPicsInfo(String sendPicsInfo) {
		SendPicsInfo = sendPicsInfo;
	}
	public String getCount() {
		return Count;
	}
	public void setCount(String count) {
		Count = count;
	}
	public String getPicList() {
		return PicList;
	}
	public void setPicList(String picList) {
		PicList = picList;
	}
	public String getPicMd5Sum() {
		return PicMd5Sum;
	}
	public void setPicMd5Sum(String picMd5Sum) {
		PicMd5Sum = picMd5Sum;
	}

}
