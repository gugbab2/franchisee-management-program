package com.biz.fm.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.biz.fm.domain.Member;
import com.biz.fm.domain.MemberDto;
import com.biz.fm.domain.Sign;
import com.biz.fm.exception.EmailDuplicationException;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignService {
	
	private final MemberRepository memberRepository;
	
	public boolean signUp(Sign.Up signUpinfo) throws ParseException {
		
		boolean result = this.isDuplicate(signUpinfo.getEmail());
		if(result) throw new EmailDuplicationException(); 
		
		SimpleDateFormat dt = new SimpleDateFormat("yyyy-mm-dd"); 
		Date date = dt.parse(signUpinfo.getBirth()); 
		String uuid = UUID.randomUUID().toString();
		
		MemberDto.SignIn newMember = MemberDto.SignIn.builder()
								.id(uuid)
								.name(signUpinfo.getName())
								.email(signUpinfo.getEmail())
								.password(signUpinfo.getPassword())
								.role("admin")
								.phoneNumber(Integer.parseInt(signUpinfo.getPhoneNumber()))
								.birth(date)
								.gender(signUpinfo.getGender())
								.address(signUpinfo.getAddress())
								.build();

		memberRepository.insert(newMember);
		return true;
	}
	
	public Member signIn(Sign.In signInInfo) {
		return memberRepository.findByEmail(signInInfo.getEmail());
	}
	
	//중복확인
	public boolean isDuplicate(String email) {
		Member member = memberRepository.findByEmail(email);
		if(member == null) return false;
		else return true;
	}
}
