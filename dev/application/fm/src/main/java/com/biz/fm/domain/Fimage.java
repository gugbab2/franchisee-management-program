package com.biz.fm.domain;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Fimage {
	private String id;
	private String businessNumber;
	private String path;
	private Integer size;
	private String name;
	private String type;
	private Timestamp createDate;
	@JsonIgnore
	private Timestamp deleteDate;
	
	public Fimage patch(Fimage newFimage) {
		
		if(newFimage.getPath() != null) this.setPath(newFimage.getPath());
		if(newFimage.getSize() != null) this.setSize(newFimage.getSize());
		if(newFimage.getName() != null) this.setName(newFimage.getName());
		if(newFimage.getType() != null) this.setType(newFimage.getType());
		
		return this;
	}
}
