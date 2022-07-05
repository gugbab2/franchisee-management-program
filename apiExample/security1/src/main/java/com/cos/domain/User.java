package com.cos.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails{
	private long msrl;
	private String uid;
	private String name;
	private String password;
	private String role;
	
	public User (String uid, String name, String password, String role) {
		this.uid = uid;
		this.name = name;
		this.password = password;
		this.role = role;
	}

	//roles는 회원이 가지고 있는 권한 정보이고, 가입했을 때 기본적으로 "ROLE_USER" 가 셋팅된다.
	//권한은 회원당 여러개가 설정될 수 있기 때문에 Collection 으로 선언한다. 
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> list = new ArrayList<>();
		list.add(new SimpleGrantedAuthority(this.role));
		return list;
	}

	@Override
	public String getPassword() {
		return this.password;
	} 

	//spring security 에서 사용하는 회원 구분 id 이다. 
	@Override
	public String getUsername() {
		return this.uid;
	}

	//아래의 메서드 들은 spring security 에서 사용하는 메서드이고, 여기서는 사용 안하기 때문에 return true
	//Json 결과로 출력 안 할 데이터는 @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 선언해준다. 
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isEnabled() {
		return true;
	}
}



