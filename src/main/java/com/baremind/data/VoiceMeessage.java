package com.baremind.data;

public class VoiceMeessage {

	public String ToUserName;	//开发者微信号
	public String FromUserName;	//发送方帐号（一个OpenID）
	public int CreateTime;	//消息创建时间 （整型）
	public String MsgType;	//语音为voice
	public int MediaId;	//语音消息媒体id，可以调用多媒体文件下载接口拉取数据。
	public String Format;	//语音格式，如amr，speex等
	public int MsgID;	//消息id，64位整型
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
	public int getMediaId() {
		return MediaId;
	}
	public void setMediaId(int mediaId) {
		MediaId = mediaId;
	}
	public String getFormat() {
		return Format;
	}
	public void setFormat(String format) {
		Format = format;
	}
	public int getMsgID() {
		return MsgID;
	}
	public void setMsgID(int msgID) {
		MsgID = msgID;
	}
	
	
}
