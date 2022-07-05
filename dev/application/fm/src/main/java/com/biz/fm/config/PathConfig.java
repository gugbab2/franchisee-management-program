package com.biz.fm.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PathConfig {
	
	@Bean
	public Path path() {
		return Paths.get("/fileStore").toAbsolutePath().normalize();
	}
}
