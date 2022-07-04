package com.cos.repo;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.cos.domain.User;

@Mapper
public interface UserRepo {

	@Select("select * from user")
	public List<User> findAll();
	
	@Insert("insert into user (uid, name) values (#{uid}, #{name})")
	public int save(User user);
}
