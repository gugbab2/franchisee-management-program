package com.biz.fm.domain;

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
	@NoArgsConstructor
	@AllArgsConstructor
	public static class safeinfo{
		private String id;
		private String name;
		private String email;
		private Integer phoneNumber;
	}
}
