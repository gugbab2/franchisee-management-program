package com.biz.fm.domain;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;

import com.biz.fm.repository.MemberRepository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
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
	
	public Member patch(Member requestMember) {
		
		if(requestMember.getId() != null) this.setId(requestMember.getId());
		if(requestMember.getName() != null) this.setName(requestMember.getName());
		if(requestMember.getEmail() != null) this.setEmail(requestMember.getEmail());
		if(requestMember.getPassword() != null) this.setPassword(requestMember.getPassword());
		if(requestMember.getRole() != null) this.setRole(requestMember.getRole());
		if(requestMember.getPhoneNumber() != null) this.setPhoneNumber(requestMember.getPhoneNumber());
		
		return this;
	}
}





