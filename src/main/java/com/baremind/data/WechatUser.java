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
@Table(name="wechat_users")
public class WechatUser {
	@Id
	@Column(name = "id")
	public Long id;
	
	@Column(name = "user_id")
	public Long userId;
	
	@Column(name = "token")
	public String token;
	
	@Column(name = "refresh_token")
	public String refreshToken;
	
	@Column(name = "expiry")
	public Date expiry;
	
	@Column(name = "ref_id")
	public String refId;
	
	@Column(name = "open_id")
	public String openId;
	
	@Column(name = "union_id")
	public String unionId;
	
	@Column(name = "nickname")
	public String nickname;
	
	@Column(name = "sex")
	public Long sex;
	
	@Column(name = "city")
	public String city;
	
	@Column(name = "province")
	public String province;
	
	@Column(name = "country")
	public String country;
	
	@Column(name = "head")
	public String head;
	
	@Column(name = "privilege")
	public String[] privilege;
	
	@Column(name = "info")
	public String info;

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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public Date getExpiry() {
		return expiry;
	}

	public void setExpiry(Date expiry) {
		this.expiry = expiry;
	}

	public String getRefId() {
		return refId;
	}

	public void setRefId(String refId) {
		this.refId = refId;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public String getUnionId() {
		return unionId;
	}

	public void setUnionId(String unionId) {
		this.unionId = unionId;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Long getSex() {
		return sex;
	}

	public void setSex(Long sex) {
		this.sex = sex;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public String[] getPrivilege() {
		return privilege;
	}

	public void setPrivilege(String[] privilege) {
		this.privilege = privilege;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
	
	
}
