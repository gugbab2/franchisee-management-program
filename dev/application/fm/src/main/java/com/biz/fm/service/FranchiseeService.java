package com.biz.fm.service;

import java.util.List;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeCreate;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeRead;
import com.biz.fm.domain.dto.FranchiseeDto.FranchiseeUpdate;
import com.biz.fm.domain.dto.FranchiseeDto.Hours;
import com.biz.fm.domain.entity.Franchisee;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.FranchiseeRepository;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FranchiseeService {
	
	private final FranchiseeRepository franchiseeRepository;
	private final ObjectMapper objectMapper;
	
	public List<FranchiseeRead> findAll() throws NotFoundException{
		List<FranchiseeRead> franchiseeReads = franchiseeRepository.findAll();
		
		if(franchiseeReads.size() == 0) throw new NotFoundException(null);
		
		return franchiseeReads;
	}
	
	public FranchiseeRead findByBusinessNumber(String businessNumber) throws NotFoundException{
		FranchiseeRead franchiseeRead = franchiseeRepository.findDtoByBusinessNumber(businessNumber);
		
		if(franchiseeRead == null) throw new NotFoundException(null);
		
		return franchiseeRead;
	}
	
	public Hours findHoursByBusinessNumber(String businessNumber) throws JsonMappingException, JsonProcessingException, NotFoundException {
		String hours =  franchiseeRepository.findHoursByBusinessNumber(businessNumber);
		if(hours == null) throw new NotFoundException(null);
		
		return objectMapper.readValue(franchiseeRepository.findHoursByBusinessNumber(businessNumber), Hours.class);
	}
	
	public FranchiseeRead insert(FranchiseeCreate franchiseeCreate) {
		if(!isJson(franchiseeCreate.getHours())) throw new InsertFailException();
		
		int result = franchiseeRepository.insert(franchiseeCreate);
		if(result > 0) {
			return franchiseeRepository.findDtoByBusinessNumber(franchiseeCreate.getBusinessNumber());
		}
		else throw new InsertFailException(); 
	}
	
	private boolean isJson(String jsonSting) {
		try {
			objectMapper.readTree(jsonSting);
	    } catch (JacksonException e) {
	        return false;
	    }
	    return true;
	}
	
	public FranchiseeRead update(String businessNumber, FranchiseeUpdate franchisee) {
		
		Franchisee oldFranchisee = franchiseeRepository.findEntityByBusinessNumber(businessNumber);
		if(oldFranchisee == null) throw new UpdateFailException();
		
		Franchisee newFranchisee = oldFranchisee.patch(franchisee);
		
		int result = franchiseeRepository.update(newFranchisee);
		if(result > 0) {
			return franchiseeRepository.findDtoByBusinessNumber(businessNumber);
		}
		else throw new UpdateFailException();
		
	}
	
	public FranchiseeRead delete(String businessNumber) {
		
		FranchiseeRead franchiseeRead = franchiseeRepository.findDtoByBusinessNumber(businessNumber);
		if(franchiseeRead == null) throw new DeleteFailException();
		
		int result = franchiseeRepository.delete(businessNumber);
		if(result > 0) {
			return franchiseeRead;
		}
		else throw new DeleteFailException();
	}

	
}
