package com.cos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

// OAuth 토큰에 의해 보호되고 있는 자원 서버에 대한 설정
// 자원에대한 보호를 구현하는 Spring Security Filter 를 제공한다. 
// @EnableResourceServer 어노테이션을 붙임으로서 해당 필터를 활성화 할 수 있다.
@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter{

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.anonymous().disable()
            .authorizeRequests()
            .antMatchers("/users/**").authenticated()
            .and()
            .exceptionHandling()
            .accessDeniedHandler(new OAuth2AccessDeniedHandler());
    }
}
