package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.Member;
import com.biz.fm.domain.MemberDto;

@Mapper
public interface MemberRepository {
	@Select("select * from member")
	public List<Member> findAll();
	
	@Select("select * from member where email = #{email}")
	public Member findByEmail(String email);

	@Insert("insert into member values "
			+ "(#{id}, #{name}, #{email}, #{password}, #{role}, #{phoneNumber}, #{birth}, #{gender}, #{address}, now(), null)")
	public int insert(MemberDto.SignIn member);
	
	@Update("update member set "
			+ "name = #{name}, email = #{email}, password = #{password}, role = #{role}, phone_number = #{phoneNumber} "
			+ "birth = #{birth}, gender = #{gender}, address = #{address} where id = #{id}")
	public int update(Member member);

	@Update("update member set delete_Date = now() where id = #{id}")
	public int delete(String id);
	
}
