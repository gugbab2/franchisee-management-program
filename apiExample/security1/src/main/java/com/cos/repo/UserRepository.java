package com.cos.repo;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.cos.domain.User;

@Mapper
public interface UserRepository {

	@Select("select * from user")
	public List<User> findAll();
	
	@Select("select * from user where username=#{username}")
	public User findByUsername(String username);
	
	@Insert("insert into user values (id, username, password)")
	public User save(User user);
}
