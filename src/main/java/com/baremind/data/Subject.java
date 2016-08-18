package com.baremind.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by lenovo on 2016/8/18.
 */
@Entity
@Table(name="subjects")
public class Subject {
	@Id
    @Column(name = "id")
    public Long id;
	
	@Column(name = "name")
    public String name;
}
