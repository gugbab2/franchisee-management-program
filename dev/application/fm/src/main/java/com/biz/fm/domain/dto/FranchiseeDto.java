package com.biz.fm.domain.dto;

import java.sql.Timestamp;

import com.biz.fm.domain.dto.MemberDto.MemberRead;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FranchiseeDto {
	
	@Getter
	@Setter
	public static class FranchiseeCreate{
		private String businessNumber;
		private String name;
		private String firstImg;
		private String postalCode;
		private String address;
		private Double x;
		private Double y;
		private String phoneNumber;
		private String ownerId;
		private String intro;
		private String hours;
	}
	
	@Getter
	@Setter
	public static class FranchiseeRead{
		private String businessNumber;
		private String name;
		private String firstImg;
		private String postalCode;
		private String address;
		private Double x;
		private Double y;
		private String phoneNumber;
		private MemberRead owner;
		private String intro;
		private Timestamp createDate;
	}
	
	@Getter
	@Setter
	public static class FranchiseeUpdate{
		private String name;
		private String firstImg;
		private String postalCode;
		private String address;
		private Double x;
		private Double y;
		private String phoneNumber;
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
