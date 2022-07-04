package com.biz.fm.domain;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Menu {
	private String id;
	private String name;
	private String description; 
	private String image;
	private String businessNumber;
	private Integer price;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Menu patch(Menu requestMenu) {
		
		if(requestMenu.getId() != null) this.setId(requestMenu.getId());
		if(requestMenu.getName() != null) this.setName(requestMenu.getName());
		if(requestMenu.getPrice() != null) this.setPrice(requestMenu.getPrice());
		if(requestMenu.getDescription() != null) this.setDescription(requestMenu.getDescription());
		if(requestMenu.getImage() != null) this.setImage(requestMenu.getImage());
		if(requestMenu.getBusinessNumber() != null) this.setBusinessNumber(requestMenu.getBusinessNumber());
		
		return this;
	}
}
