package com.biz.fm.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDto {

	private String name;
	private String email;
	private String password;
	private String phoneNumber;
	private String birth;
	private String gender;
	private String address;
	
}
