package com.biz.fm.domain.dto;

import java.sql.Timestamp;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class MemberDto {
	
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class SignIn{
		private String id;
		private String name;
		private String email;
		private String password;
		private String role;
		private Integer phoneNumber;
		private Date birth;
		private String gender;
		private String address;
	}
	
	@Getter
	@Setter
	public static class safeinfo{
		private String id;
		private String name;
		private String email;
		private Integer phoneNumber;
	}
	
	@Getter
	@Setter
	public static class MemberRead{
		private String id;
		private String name;
		private String email;
		private Integer phoneNumber;
		private String gender;
		private String address;
		private Timestamp createDate;
	}
	
	@Getter
	@Setter
	public static class MemberUpdate{
		private String password;
		private String role;
		private Integer phoneNumber;
		private String address;
	}
}
