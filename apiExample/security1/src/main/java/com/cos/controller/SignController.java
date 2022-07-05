package com.cos.controller;

import java.util.Collections;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cos.domain.User;
import com.cos.jwt.JwtTokenProvider;
import com.cos.repo.CommonResult;
import com.cos.repo.SingleResult;
import com.cos.repo.UserRepo;
import com.cos.service.ResponseService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = { "1. Sign" })
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1")
public class SignController {

	private final UserRepo userRepo;
	private final JwtTokenProvider jwtTokenProvider;
	private final ResponseService responseService;
	private final PasswordEncoder passwordEncoder;

	@ApiOperation(value = "로그인", notes = "이메일을 사용해 회원 로그인.")
	@PostMapping(value = "/signin")
	public SingleResult<String> signin(
			@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
			@ApiParam(value = "비밀번호", required = true) @RequestParam String password) {
		User user = userRepo.findById(id);
		return responseService
				.getSingleResult(jwtTokenProvider.createToken(String.valueOf(user.getMsrl()), user.getRole()));

	}

	@ApiOperation(value = "가입", notes = "회원가입을 한다.")
	@PostMapping(value = "/signup")
	public CommonResult signup(
			@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
			@ApiParam(value = "이름", required = true) @RequestParam String name,
			@ApiParam(value = "비밀번호", required = true) @RequestParam String password
			) {

		if(userRepo.findById(name)==null) {
			userRepo.save(new User(id, name, password,"admin"));
			return responseService.getSuccessResult();
		}else {
			return responseService.getFailResult(401, password);
		} 
	}
}