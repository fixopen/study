package com.baremind.data;


import javax.persistence.*;
/**
 * Created by lenovo on 2016/8/18.
 */
@Entity
@Table(name="schedulers")
public class Scheduler {
	@Id
	@Column(name = "id")
	public Long id;
	
	@Column(name = "year")
	public int year;
	
	@Column(name = "week")
	public int week;
	
	@Column(name = "state")
	public int state;
	
	@Column(name = "state_time")
	public int stateTime;
	
	@Column(name = "end_time")
	public int endTime;
	
	@Column(name = "duration")
	public String duration;
	
	@Column(name = "subject_id")
	public Long subjectId;
	
	@Column(name = "grade")
	public int grade;
	
	@Column(name = "title")
	public String title;
	
	@Column(name = "description")
	public String description;
	
	@Column(name = "teacher")
	public String teacher;
	
	@Column(name = "teacher_description")
	public String teacherDescription;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getWeek() {
		return week;
	}

	public void setWeek(int week) {
		this.week = week;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getStateTime() {
		return stateTime;
	}

	public void setStateTime(int stateTime) {
		this.stateTime = stateTime;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTeacher() {
		return teacher;
	}

	public void setTeacher(String teacher) {
		this.teacher = teacher;
	}

	public String getTeacherDescription() {
		return teacherDescription;
	}

	public void setTeacherDescription(String teacherDescription) {
		this.teacherDescription = teacherDescription;
	}
	
	
}
