package com.biz.fm.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.MemberDto;
import com.biz.fm.domain.dto.Sign;
import com.biz.fm.domain.dto.Token;
import com.biz.fm.domain.dto.MemberDto.MemberRead;
import com.biz.fm.domain.dto.MemberDto.SignIn;
import com.biz.fm.domain.entity.Member;
import com.biz.fm.exception.custom.EmailDuplicationException;
import com.biz.fm.exception.custom.InvalidEmailException;
import com.biz.fm.exception.custom.InvalidPasswordException;
import com.biz.fm.repository.MemberRepository;
import com.biz.fm.utils.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignService {
	
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberService memberService;
	
	public MemberDto.MemberRead signUp(Sign.Up signUpinfo) throws ParseException {
		
		boolean result = this.isDuplicate(signUpinfo.getEmail());
		if(result) throw new EmailDuplicationException();
		
		SimpleDateFormat dt = new SimpleDateFormat("yyyy-mm-dd"); 
		Date date = dt.parse(signUpinfo.getBirth()); 
		String uuid = UUID.randomUUID().toString().replace("-", "");
		
		SignIn newMember = SignIn.builder()
								.id(uuid)
								.name(signUpinfo.getName())
								.email(signUpinfo.getEmail())
								.password(passwordEncoder.encode(signUpinfo.getPassword()))
								.role("admin")
								.phoneNumber(Integer.parseInt(signUpinfo.getPhoneNumber()))
								.birth(date)
								.gender(signUpinfo.getGender())
								.address(signUpinfo.getAddress())
								.build();

		MemberRead memberRead =  memberService.insert(newMember);
		
		return memberRead;
	}
	
	public Token signIn(Sign.In signInInfo) {
		
		Member member = memberRepository.findEntityByEmail(signInInfo.getEmail());
		if(member == null) throw new InvalidEmailException();
		
		if(passwordEncoder.matches(signInInfo.getPassword(), member.getPassword())) {
			String token = jwtTokenProvider.createToken(member.getId(), member.getRole());
			Token createToken = new Token(token);
			return createToken;
		}else throw new InvalidPasswordException();
	}
	
	//중복 확인
	public boolean isDuplicate(String email) {
		Member member = memberRepository.findEntityByEmail(email);
		if(member == null) return false;
		else return true;
	}
	
	//패스워드 확인
	public boolean isPassword(Sign.In signInInfo) {
		//Member 가 null 일 때 예외처리
		Member beforeMember = memberRepository.findEntityByEmail(signInInfo.getEmail());
		boolean checkPassword = passwordEncoder.matches(beforeMember.getPassword(), signInInfo.getPassword());
		if(checkPassword) return true;
		else return false;
	}
}
