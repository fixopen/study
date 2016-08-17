package com.baremind.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by lenovo on 2016/8/17.
 */
@Entity
@Table(name="devices")
public class Device {
	@Id
	@Column(name = "id")
	public Long id;
	
	@Column(name = "user_id")
	public Long userId;
	
	@Column(name = "platform")
	public String platform;
	
	@Column(name = "platform_identity")
	public String platformIdentity;
	
	@Column(name = "platform_notification_token")
	public String platformNotificationToken;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getPlatform() {
		return platform;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public String getPlatformIdentity() {
		return platformIdentity;
	}

	public void setPlatformIdentity(String platformIdentity) {
		this.platformIdentity = platformIdentity;
	}

	public String getPlatformNotificationToken() {
		return platformNotificationToken;
	}

	public void setPlatformNotificationToken(String platformNotificationToken) {
		this.platformNotificationToken = platformNotificationToken;
	}
	
	
}
