package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.Menu;

@Mapper
public interface MenuRepository {
	@Select("select * from menu")
	public List<Menu> findAll();
	
	@Select("select * from menu where id = #{id}")
	public Menu findById(String id);
	
	@Insert("insert into menu values (#{id}, #{name}, #{price}, #{description}, #{image}, #{businessNumber}, now(), null)")
	public int insert(Menu menu);
	
	@Update("update menu set name = #{name}, price = #{price}, description = #{description}, image = #{image} where id = #{id}")
	public int update(Menu menu);
	
	@Update("update menu set delete_Date = now() where id = #{id}")
	public int delete(String id);
}
