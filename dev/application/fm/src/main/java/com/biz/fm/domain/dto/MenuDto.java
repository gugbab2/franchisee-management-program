package com.biz.fm.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MenuDto {
	
	@Getter
	@Setter
	@Builder
	public static class MenuResponse{
		private String id;
		private String name;
		private String description; 
		private String imagePath;
		private String businessNumber;
		private Integer price;
	}
	
	@Getter
	@Setter
	public static class MenuUpdate{
		private String name;
		private String description; 
		private String imagePath;
		private Integer price;
	}
	
	@Getter
	@Setter
	public static class MenuCreate{
		@JsonProperty(access = Access.WRITE_ONLY)
		private String id;
		private String name;
		private String description; 
		private String imagePath;
		private Integer price;
	}
	
	
}
 