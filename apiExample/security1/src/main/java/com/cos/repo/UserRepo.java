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
	
	@Select("select * from user where uid=#{uid}")
	public User findById(String uid);
	
	@Select("select * from user where msrl=#{msrl}")
	public User findByMsrl(int msrl);
	
	@Insert("insert into user (uid, name, password, role) values (#{uid}, #{name}, #{password}, #{role})")
	public int save(User user);
	
}
  