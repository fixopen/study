package com.baremind.data;

public class LinkMessage {

	public String ToUserName;//	接收方微信号
	public String FromUserName;//	发送方微信号，若为普通用户，则是一个OpenID
	public int CreateTime;//	消息创建时间
	public String MsgType;	//消息类型，link
	public String Title;	//消息标题
	public String Description;	//消息描述
	public String Url;	//消息链接
	public int MsgId;//消息id，64位整型
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
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public String getUrl() {
		return Url;
	}
	public void setUrl(String url) {
		Url = url;
	}
	public int getMsgId() {
		return MsgId;
	}
	public void setMsgId(int msgId) {
		MsgId = msgId;
	}
	
	
}
