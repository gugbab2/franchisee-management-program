package com.biz.fm.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.biz.fm.domain.Franchisee;
import com.biz.fm.repository.FranchiseeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FranchiseeService {
	
	private final FranchiseeRepository franchiseeRepository;
	
	public List<Franchisee> findAll(){
		return franchiseeRepository.findAll();
	}
	
	public Franchisee findById(String id) {
		return franchiseeRepository.findById(id);
	}
	
	public int insert(Franchisee franchisee) {
		return franchiseeRepository.insert(franchisee);
	}
	
	@Transactional
	public int update(String businessNumber, Franchisee franchisee) {
		
		Franchisee oldFranchisee = this.findById(businessNumber);
		Franchisee newFranchisee = oldFranchisee.patch(franchisee);
		
		return franchiseeRepository.update(newFranchisee);
	}
	
	public int delete(String businessNumber) {
		return franchiseeRepository.delete(businessNumber);
	}
	
}
