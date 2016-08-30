package com.baremind.data;

public class ScancodePush {

	public String 	ToUserName;	//开发者微信号
	public String 	FromUserName;	//发送方帐号（一个OpenID）
	public int 	CreateTime;	//消息创建时间（整型）
	public String 	MsgType;	//消息类型，event
	public String 	Event;	//事件类型，scancode_push
	public String 	EventKey;	//事件KEY值，由开发者在创建菜单时设定
	public String 	ScanCodeInfo;	//扫描信息
	public String 	ScanType;	//扫描类型，一般是qrcode
	public String 	ScanResult;	//扫描结果，即二维码对应的字符串信息
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
	public String getScanCodeInfo() {
		return ScanCodeInfo;
	}
	public void setScanCodeInfo(String scanCodeInfo) {
		ScanCodeInfo = scanCodeInfo;
	}
	public String getScanType() {
		return ScanType;
	}
	public void setScanType(String scanType) {
		ScanType = scanType;
	}
	public String getScanResult() {
		return ScanResult;
	}
	public void setScanResult(String scanResult) {
		ScanResult = scanResult;
	}
	
}
