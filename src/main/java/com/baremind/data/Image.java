package com.baremind.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by lenovo on 2016/8/17.
 */
@Entity
@Table(name="images")
public class Image {
	@Id
	@Column(name = "id")
	public Long id;
	
	@Column(name = "mime_type")
	public String mimeType;
	
	@Column(name = "size")
	public Long size;
	
	@Column(name = "name")
	public String name;
	
	@Column(name = "ext")
	public String ext;
	
	@Column(name = "store_path")
	public String storePath;
	
	@Column(name = "main_color")
	public Integer mainColor;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMimeType() {
		return mimeType;
	}

	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}

	public Long getSize() {
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

	public String getStorePath() {
		return storePath;
	}

	public void setStorePath(String storePath) {
		this.storePath = storePath;
	}

	public Integer getMainColor() {
		return mainColor;
	}

	public void setMainColor(Integer mainColor) {
		this.mainColor = mainColor;
	}
	
	
}