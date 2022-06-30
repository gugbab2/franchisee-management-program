package com.biz.fm.domain;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Fimage {
	private String id;
	private String businessNumber;
	private String path;
	private Integer size;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Fimage patch(Fimage newFimage) {
		
		if(newFimage.getPath() != null) this.setPath(newFimage.getPath());
		if(newFimage.getSize() != null) this.setSize(newFimage.getSize());
		
		return this;
	}
}
