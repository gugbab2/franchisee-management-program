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
public class Member {
	private String id;
	private String name;
	private String email;
	private String password;
	private String role;
	private Integer phoneNumber;
	private Timestamp createDate;
	private Timestamp deleteDate;
}
