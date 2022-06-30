package com.biz.fm.domain;

import java.sql.Timestamp;

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
	private String postalCode;
	private String address;
	private Double x;
	private Double y;
	private String phoneNumber;
	private String owner;
	private String intro;
	private String hours;
	private Timestamp createDate;
	private Timestamp deleteDate;
	
	public Franchisee patch(Franchisee newFranchisee) {
		
		if(newFranchisee.getName() != null) this.setName(newFranchisee.getName());
		if(newFranchisee.getFirstImg() != null) this.setFirstImg(newFranchisee.getFirstImg());
		if(newFranchisee.getPostalCode() != null) this.setPostalCode(newFranchisee.getPostalCode());
		if(newFranchisee.getAddress() != null) this.setAddress(newFranchisee.getAddress());
		
		if(newFranchisee.getX() != null) this.setX(newFranchisee.getX());
		if(newFranchisee.getY() != null) this.setY(newFranchisee.getY());
		
		if(newFranchisee.getPhoneNumber() != null) this.setPhoneNumber(newFranchisee.getPhoneNumber());
		if(newFranchisee.getOwner() != null) this.setOwner(newFranchisee.getOwner());
		if(newFranchisee.getIntro() != null) this.setIntro(newFranchisee.getIntro());
		if(newFranchisee.getHours() != null) this.setHours(newFranchisee.getHours());
		
		return this;
	}
}
