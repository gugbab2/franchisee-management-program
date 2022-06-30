package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.Member;

@Mapper
public interface MemberRepository {
	@Select("select * from member")
	public List<Member> findAll();
	
	@Select("select * from member where id = #{id}")
	public Member findById(String id);

	@Insert("insert into member values (#{id}, #{name}, #{email}, #{password}, #{role}, #{phoneNumber}, now(), null)")
	public int insert(Member member);
	
	@Update("update member set name = #{name}, email = #{email}, password = #{password}, role = #{role}, phone_number = #{phoneNumber} where id = #{id}")
	public int update(Member member);

	@Update("update member set delete_Date = now() where id = #{id}")
	public int delete(String id);
	
	
}
