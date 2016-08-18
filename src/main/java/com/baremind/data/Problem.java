package com.baremind.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by lenovo on 2016/8/18.
 */
@Entity
@Table(name="problems")
public class Problem {
	@Id
    @Column(name = "id")
    public Long id;
	
	@Column(name = "subject_id")
    public Long subjectId;
 	
 	@Column(name = "volume_id")
    public Long volumeId;
	
	@Column(name = "knowledge_point_id")
    public Long knowledgePointId;
	
	@Column(name = "title")
    public String title;
	
	@Column(name = "options ")
    public String[] options ;
	
	@Column(name = "standard_answers")
    public int[] standardAnswers;
	
	@Column(name = "order")
    public int order;
 	
 	@Column(name = "store_path")
    public String storePath;
 	
 	@Column(name = "video_url")
    public String videoUrl;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	public Long getVolumeId() {
		return volumeId;
	}

	public void setVolumeId(Long volumeId) {
		this.volumeId = volumeId;
	}

	public Long getKnowledgePointId() {
		return knowledgePointId;
	}

	public void setKnowledgePointId(Long knowledgePointId) {
		this.knowledgePointId = knowledgePointId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String[] getOptions() {
		return options;
	}

	public void setOptions(String[] options) {
		this.options = options;
	}

	public int[] getStandardAnswers() {
		return standardAnswers;
	}

	public void setStandardAnswers(int[] standardAnswers) {
		this.standardAnswers = standardAnswers;
	}

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public String getStorePath() {
		return storePath;
	}

	public void setStorePath(String storePath) {
		this.storePath = storePath;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

}
