package com.cos.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cos.repo.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

	private final UserRepo userRepo;
	
	//토큰에 세팅된 유저 정보로 회원정보를 조회하는 UserDetailService 재정의
	@Override
	public UserDetails loadUserByUsername(String userPK) throws UsernameNotFoundException {
		return userRepo.findByMsrl(Integer.parseInt(userPK));
	}

}
