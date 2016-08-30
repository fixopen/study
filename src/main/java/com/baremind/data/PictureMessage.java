package com.baremind.data;

public class PictureMessage {

	public String ToUserName;//	开发者微信号
	public String FromUserName;//	发送方帐号（一个OpenID）
	public int CreateTime;//	消息创建时间 （整型）
	public String MsgType;//	image
	public String PicUrl;//	图片链接
	public int MediaId;//	图片消息媒体id，可以调用多媒体文件下载接口拉取数据。
	public int MsgId;//	消息id，64位整型
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
	public String getPicUrl() {
		return PicUrl;
	}
	public void setPicUrl(String picUrl) {
		PicUrl = picUrl;
	}
	
	public int getMediaId() {
		return MediaId;
	}
	public void setMediaId(int mediaId) {
		MediaId = mediaId;
	}
	public int getMsgId() {
		return MsgId;
	}
	public void setMsgId(int msgId) {
		MsgId = msgId;
	}
	
}
