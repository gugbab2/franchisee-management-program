package com.biz.fm.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public enum ErrorCode {
	//COMMON
	INTERNAL_SERVER_ERROR(HttpStatus.BAD_REQUEST, "C001", ""),
	
	//Member
	EMAIL_DUPLICATION(HttpStatus.BAD_REQUEST, "M001", "Email is Duplication"),
	DATE_PARSE_ERROR(HttpStatus.BAD_REQUEST, "M002", "Date format Exception"),
	INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "M003", "Invalid Password Exception")
	;
	
	private final HttpStatus status;
	private final String code;
	private final String message;
	
	private ErrorCode(final HttpStatus status, final String code, final String message) {
		this.status = status;
		this.code = code;
		this.message = message;
	}
}
