package com.cos.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

//jwt가 유효한 토큰인지 인증하기 위한 필터
//security 설정 시 usernamePasswordAuthenticationFilter 앞에 세팅한다. 
public class JwtAuthenticationFilter extends GenericFilterBean {
	
	private JwtTokenProvider jwtTokenProvider;

	public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
		this.jwtTokenProvider = jwtTokenProvider;
	}
	

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws IOException, ServletException {
		String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
	     if (token != null && jwtTokenProvider.validateToken(token)) {
	         Authentication auth = jwtTokenProvider.getAuthentication(token);
	         SecurityContextHolder.getContext().setAuthentication(auth);
	     }
	     filterChain.doFilter(request, response);

	}

}