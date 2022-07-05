package com.biz.fm.exception;

import java.text.ParseException;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.log4j.Log4j2;

@RestControllerAdvice
public class FmExceptionHandler {

//	@ExceptionHandler(value = Exception.class)
//	public ResponseEntity<?> exception(Exception ex){
//		return getResponseEntity(ErrorCode.INTERNAL_SERVER_ERROR);
//	}
	
	@ExceptionHandler(value = NotFoundException.class)
	public ResponseEntity<?> notFoundException(Exception ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = EmailDuplicationException.class)
	public ResponseEntity<?> emailDuplicationException(EmailDuplicationException ex){
		return getResponseEntity(ErrorCode.EMAIL_DUPLICATION);
	}
	
	@ExceptionHandler(value = ParseException.class)
	public ResponseEntity<?> parseException(ParseException ex){
		return getResponseEntity(ErrorCode.DATE_PARSE_ERROR);
	}
	
	private ResponseEntity<?> getResponseEntity(ErrorCode errorCode){
		ExceptionResponse exceptionResponse = new ExceptionResponse(errorCode);
		return ResponseEntity.status(exceptionResponse.getStatus()).body(exceptionResponse);
	}
}
