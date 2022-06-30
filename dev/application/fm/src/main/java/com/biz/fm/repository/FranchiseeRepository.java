package com.biz.fm.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.biz.fm.domain.Franchisee;

@Mapper

public interface FranchiseeRepository{
	
	@Select("select * from franchisee where delete_date is null")
	public List<Franchisee> findAll();
	
	@Select("select * from franchisee where business_number = #{businessNumber} and delete_date is null")
	public Franchisee findById(String businessNumber);
	
	@Insert("insert into franchisee values (#{businessNumber}, #{name}, #{firstImg}, "
			+ "#{postalCode}, #{address}, #{x}, #{y}, #{phoneNumber}, #{owner}, #{intro}, #{hours}, now(), null)")
	public int insert(Franchisee franchisee);
	
	@Update("update franchisee set name = #{name}, first_img = #{firstImg}, postal_code = #{postalCode},"
			+ "address = #{address}, x = #{x}, y = #{y}, phone_number = #{phoneNumber}, intro = #{intro},"
			+ "hours = #{hours} where business_number = #{businessNumber}")
	public int update(Franchisee franchisee);
	
	@Update("update franchisee set delete_date = now() where business_number = #{businessNumber}")
	public int delete(String businessNumber);
}
