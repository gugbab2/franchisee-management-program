package com.biz.fm.domain.dto;

import java.sql.Timestamp;

import com.biz.fm.domain.dto.MemberDto.MemberResponse;
import com.biz.fm.domain.entity.Address;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FranchiseeDto {
	
	@Getter
	@Setter
	@Builder
	public static class FranchiseeResponse{
		private String businessNumber;
		private String name;
		private String firstImg;
		private Address address;
		private Double x;
		private Double y;
		private String tel;
		private String ownerName;
		private String intro;
		private String hours;
		@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
		private Timestamp createDate;
	}
	
	@Getter
	@Setter
	public static class FranchiseeCreate{
		private String businessNumber;
		private String name;
		private String firstImg;
		private Address address;
		private Double x;
		private Double y;
		private String tel;
		private String ownerId;
		private String intro;
		private String hours;
	}
	
	@Getter
	@Setter
	public static class FranchiseeUpdate{
		private String name;
		private String firstImg;
		private String tel;
		private String intro;
		private String hours;
	}
	
	@Getter
	@Setter
	public static class Hours {
		private String monday;
		private String tuesday;
		private String wednesday;
		private String thursday;
		private String friday;
		private String saturday;
		private String sunday;

	}
}
