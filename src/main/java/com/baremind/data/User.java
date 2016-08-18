package com.baremind.data;

import java.util.Date;


import javax.persistence.*;

/**
 * Created by lenovo on 2016/8/17.
 */
@Entity
@Table(name="users")
public class User {
	@Id
	@Column(name = "id")
	public Long id;
	
	@Column(name = "login_name")
	public String LoginName;
	
	@Column(name = "password")
	public String password;
	
	@Column(name = "is_administrator")
	public Boolean isAdministrator;
	
	@Column(name = "name")
	public String name;
	
	@Column(name = "head")
	public String head;
	
	@Column(name = "email")
	public String email;
	
	@Column(name = "telephone")
	public String telephone;
	
	@Column(name = "birthday")
	public Date birthday;
	
	@Column(name = "sex")
	public int sex;
	
	@Column(name = "amount")
	public String amount;
	
	@Column(name = "school")
	public String school;
	
	@Column(name = "grade")
	public String grade;
	
	@Column(name = "class")
	public String classname;
	
	@Column(name = "location")
	public String location;
	
	@Column(name = "description")
	public String description;
	
	@Column(name = "timezone")
	public String timezone;
	
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

	public String getLoginName() {
		return LoginName;
	}

	public void setLoginName(String loginName) {
		LoginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getIsAdministrator() {
		return isAdministrator;
	}

	public void setIsAdministrator(Boolean isAdministrator) {
		this.isAdministrator = isAdministrator;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
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

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getSchool() {
		return school;
	}

	public void setSchool(String school) {
		this.school = school;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	
}
