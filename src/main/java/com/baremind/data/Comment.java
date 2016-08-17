package com.baremind.data;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Created by lenovo on 2016/8/17.
 */
@Entity
@Table(name = "comments")
public class Comment {

	@Id
	@Column(name = "id")
	public Long id;
	
	@Column(name = "client_id")
	public String clientId;
	
	@Column(name = "user_id")
	public Long userId;
	
	@Column(name = "object_type")
	public String objectType;
	
	@Column(name = "object_id")
	public Long objectId;
	
	@Column(name = "content")
	public String content;
	
	@Column(name = "create_time")
	public Date createTime;
	
	@Column(name = "update_time")
	public Date updateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public Long getObjectId() {
		return objectId;
	}

	public void setObjectId(Long objectId) {
		this.objectId = objectId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	
}
