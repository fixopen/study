package com.baremind.data;


import java.util.Date;

import javax.persistence.*;

/**
 * Created by lenovo on 2016/8/18.
 */
@Entity
@Table(name="cards")
public class Card {
	@Id
	@Column(name = "id")
	public Long id;
	
	@Column(name = "user_id")
	public Long UserId;
	
	@Column(name = "no")
	public String no;
	
	@Column(name = "password")
	public String password;
	
	@Column(name = "active_time")
	public Date activeTime;
	
	@Column(name = "end_time")
	public Date endTime;
	
	@Column(name = "duration")
	public String duration;
	
	@Column(name = "subject")
	public Long subject;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return UserId;
	}

	public void setUserId(Long userId) {
		UserId = userId;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getActiveTime() {
		return activeTime;
	}

	public void setActiveTime(Date activeTime) {
		this.activeTime = activeTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Long getSubject() {
		return subject;
	}

	public void setSubject(Long subject) {
		this.subject = subject;
	}
	
	
}
