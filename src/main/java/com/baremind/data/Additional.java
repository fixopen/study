package com.baremind.data;

import javax.persistence.*;

/**
 * Created by lenovo on 2016/8/17.
 */
@Entity
@Table(name="additionals")
public class Additional {
    @Id
    @Column(name = "id")
    public Long id;

    @Column(name = "table_name")
    public String tableName;

    @Column(name = "object_id")
    public String objectId;

    @Column(name = "name")
    public String name;

    @Column(name = "value")
    public String value;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}


}
