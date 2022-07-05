package com.biz.fm.domain;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member implements UserDetails{
	
	private String id;
	private String name;
	private String email;
	private String password;
	private String role;
	private Integer phoneNumber;
	private Date birth;
	private String gender;
	private String address;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Member patch(Member requestMember) {
		
		if(requestMember.getName() != null) this.setName(requestMember.getName());
		if(requestMember.getEmail() != null) this.setEmail(requestMember.getEmail());
		if(requestMember.getPassword() != null) this.setPassword(requestMember.getPassword());
		if(requestMember.getRole() != null) this.setRole(requestMember.getRole());
		if(requestMember.getPhoneNumber() != null) this.setPhoneNumber(requestMember.getPhoneNumber());
		if(requestMember.getAddress() != null) this.setAddress(requestMember.getAddress());
		if(requestMember.getBirth() != null) this.setBirth(requestMember.getBirth());
		if(requestMember.getGender() != null) this.setGender(requestMember.getGender());
		
		return this;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> list = new ArrayList<>();
		list.add(new SimpleGrantedAuthority(this.role));
		return list;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	public boolean isEnabled() {
		return true;
	}
}





