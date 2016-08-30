package com.baremind.data;

public class VideoMessage {

	public String ToUserName;	//开发者微信号
	public String FromUserName;	//发送方帐号（一个OpenID）
	public int CreateTime;	//消息创建时间 （整型）
	public String MsgType;	//视频为video
	public int MediaId;	//视频消息媒体id，可以调用多媒体文件下载接口拉取数据。
	public int ThumbMediaId;	//视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据。
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
	public int getMediaId() {
		return MediaId;
	}
	public void setMediaId(int mediaId) {
		MediaId = mediaId;
	}
	public int getThumbMediaId() {
		return ThumbMediaId;
	}
	public void setThumbMediaId(int thumbMediaId) {
		ThumbMediaId = thumbMediaId;
	}
	public int getMsgId() {
		return MsgId;
	}
	public void setMsgId(int msgId) {
		MsgId = msgId;
	}
	
	
}
