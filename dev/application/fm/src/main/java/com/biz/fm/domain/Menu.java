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
}
