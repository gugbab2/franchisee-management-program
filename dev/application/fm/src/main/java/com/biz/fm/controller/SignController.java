package com.biz.fm.controller;

import java.text.ParseException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biz.fm.domain.Member;
import com.biz.fm.domain.Sign;
import com.biz.fm.jwt.JwtTokenProvider;
import com.biz.fm.service.SignService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@Api(tags = {"1. Sign"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/sign")
public class SignController {
	
	private final JwtTokenProvider jwtTokenProvider;
//	private final ResponseService responseService;
//	private final PasswordEncoder passwordEncoder;
	private final SignService signService;
	
	@ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
	@PostMapping("/signup")
	public ResponseEntity<?> signup(
			@ApiParam(value = "회원가입 정보", required = true) @RequestBody Sign.Up signUpInfo) throws ParseException {

		boolean result = signService.signUp(signUpInfo);
		if(result) {
			return ResponseEntity.ok(signUpInfo);
		}
		return ResponseEntity.badRequest().body(signUpInfo);
	}
	
	@ApiOperation(value = "로그인", notes = "이메일 회원 로그인을 한다.")
	@PostMapping("/signin")
	public ResponseEntity<?> signin(
			@ApiParam(value = "로그인 정보", required = true) @RequestBody Sign.In signInInfo) {
		
		// 패스워드 비교 추가~~!!
		
		Member member = signService.signIn(signInInfo);
		
		if(member!=null) {
			String token = jwtTokenProvider.createToken(String.valueOf(member.getId()), member.getRole());
			return ResponseEntity.ok(token);
		}
		return ResponseEntity.badRequest().build();
	
	}
}
