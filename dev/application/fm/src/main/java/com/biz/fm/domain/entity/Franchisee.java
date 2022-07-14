package com.biz.fm.domain.entity;

import java.sql.Timestamp;

import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeResponse;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeUpdate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Franchisee {
	private String businessNumber;
	private String name;
	private String firstImg;
	private Address address;
	private Double x;
	private Double y;
	private String tel;
	private Member owner;
	private String intro;
	private String hours;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Franchisee patch(FranchiseeUpdate newFranchisee) {
		
		if(newFranchisee.getName() != null) this.setName(newFranchisee.getName());
		if(newFranchisee.getFirstImg() != null) this.setFirstImg(newFranchisee.getFirstImg());
		if(newFranchisee.getTel() != null) this.setTel(newFranchisee.getTel());
		if(newFranchisee.getIntro() != null) this.setIntro(newFranchisee.getIntro());
		if(newFranchisee.getHours() != null) this.setHours(newFranchisee.getHours());
		
		return this;
	}
	
	public FranchiseeResponse toFranchiseeResponse() {
		return FranchiseeResponse.builder()
				.businessNumber(businessNumber)
				.name(name)
				.firstImg(firstImg)
				.address(address)
				.x(x)
				.y(y)
				.tel(tel)
				.ownerName(owner.getName())
				.intro(intro)
				.hours(hours)
				.createDate(createDate)
				.build();
	}
}
