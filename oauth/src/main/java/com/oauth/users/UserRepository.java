package com.oauth.users;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserRepository {

	@Select("select * from user")
	List<User> findAll();
	
	@Select("select * from user where username=#{username}")
	User findByUsername(String username);
	
	@Insert("insert into user(username, password) values(#{username}, #{password})")
	User save(User user);
}
