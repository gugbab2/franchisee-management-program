package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.Fimage;

@Mapper
public interface FimageRepository{
	
	@Select("select * from fimage where delete_date is null")
	public List<Fimage> findAll();
	
	@Select("select * from fimage where id = #{id} and delete_date is null")
	public Fimage findById(String id);
	
	@Select("select * from fimage where business_number = #{businessNumber} and delete_date is null")
	public List<Fimage> findByBusinessNumber(String businessNumber);
	
	@Insert("insert into fimage values (#{id}, #{businessNumber}, #{path}, #{size}, #{name}, #{type}, now(), null)")
	public int insert(Fimage fimage);
	
	@Update("update fimage set path = #{path}, size = #{size} where id = #{id}")
	public int update(Fimage fimage);
	
	@Update("update fimage set delete_date = now() where id = #{id}")
	public int delete(String id);
}
