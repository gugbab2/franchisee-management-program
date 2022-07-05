package com.biz.fm.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.biz.fm.domain.Member;
import com.biz.fm.domain.SignInDto;
import com.biz.fm.domain.SignUpDto;
import com.biz.fm.exception.EmailDuplicationException;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignService {
	
	private final MemberRepository memberRepository;
	
	public boolean signUp(SignUpDto signInfo) throws ParseException {
		
		//중복 확인
		boolean result = this.isDuplicate(signInfo.getEmail());
		if(result) throw new EmailDuplicationException(); 
		
		SimpleDateFormat dt = new SimpleDateFormat("yyyy-mm-dd"); 
		Date date = dt.parse(signInfo.getBirth()); 
		String uuid = UUID.randomUUID().toString();
		
		Member newMember = Member.builder()
								.id(uuid)
								.name(signInfo.getName())
								.email(signInfo.getEmail())
								.password(signInfo.getPassword())
								.role("admin")
								.phoneNumber(Integer.parseInt(signInfo.getPhoneNumber()))
								.birth(date)
								.gender(signInfo.getGender())
								.address(signInfo.getAddress())
								.build();

		memberRepository.insert(newMember);
		return true;
	}
	
	public boolean isDuplicate(String email) {
		Member member = memberRepository.findByEmail(email);
		if(member == null) return false;
		else return true;
	}
	

	
	public Member signIn(SignInDto signInInfo) {
		return memberRepository.findByEmail(signInInfo.getEmail());
	}
	

}
