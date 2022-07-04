package com.cos.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private long msrl;
	private String uid;
	private String name;
	
	public User(String uid, String name) {
		this.uid = uid;
		this.name = name;
	}
}
