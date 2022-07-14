package com.biz.fm.controller;

import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biz.fm.domain.dto.MemberDto.MemberResponse;
import com.biz.fm.domain.dto.RefreshTokenDto;
import com.biz.fm.domain.dto.SignDto.SignIn;
import com.biz.fm.domain.dto.SignDto.SignInfo;
import com.biz.fm.domain.dto.SignDto.SignOut;
import com.biz.fm.domain.dto.SignDto.SignUp;
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
	
	private final SignService signService;
	
	@CrossOrigin
	@PostMapping("/signup")
	@ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
	public ResponseEntity<?> signup(
			@ApiParam(value = "회원가입 정보", required = true) @RequestBody SignUp signUpInfo) throws ParseException {

		MemberResponse result = signService.signUp(signUpInfo);
		return ResponseEntity.ok(result);
	}
	
	@CrossOrigin
	@PostMapping("/signin")
	@ApiOperation(value = "로그인", notes = "회원 로그인 한다.")
	public ResponseEntity<SignInfo> signin(
			@ApiParam(value = "로그인 정보", required = true) @RequestBody SignIn signInInfo) {
		return ResponseEntity.ok(signService.signIn(signInInfo));
	}
	
	@CrossOrigin
	@PostMapping("/signout")
	@ApiOperation(value = "로그아웃", notes = "회원 로그아웃 한다.")
	public ResponseEntity<?> signout(
			@ApiParam(value = "email", required = true) @RequestBody SignOut signOutInfo) {
		return ResponseEntity.ok(signService.signOut(signOutInfo.getEmail()));
	}
	
	@CrossOrigin
	@PostMapping("/get-newToken")
	@ApiOperation(value = "토큰 재발급", notes = "토큰을 재발급한다")
    public ResponseEntity<?> newAccessToken(
    		@ApiParam(value = "토큰 재발급 정보", required = true) @RequestBody RefreshTokenDto.newAccessToken refreshTokenDto, HttpServletRequest request) {
        return ResponseEntity.ok(signService.newAccessToken(refreshTokenDto, request));
    }
}
