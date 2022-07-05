package com.biz.fm.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.biz.fm.domain.Fimage;
import com.biz.fm.domain.Franchisee;
import com.biz.fm.repository.FimageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FimageService {
	
	private final FimageRepository fimageRepository;
	
	
	public List<Fimage> findAll(){
		return fimageRepository.findAll();
	}
	
	public List<Fimage> findByBusinessNumber(String BusinessNumber) {
		return fimageRepository.findByBusinessNumber(BusinessNumber);
	}
	
	public Fimage findById(String id) { 
		return fimageRepository.findById(id);
	}
	
	public int insert(Fimage fimage) {
		fimage.setId(UUID.randomUUID().toString());
		return fimageRepository.insert(fimage);
	}
	
	@Transactional
	public int update(String fimageId, Fimage fimage) {
		
		Fimage oldFimage = this.findById(fimageId);
		Fimage newFimage = oldFimage.patch(fimage);
		
		return fimageRepository.update(newFimage);
	}
	
	public int delete(String id) {
		return fimageRepository.delete(id);
	}
	

}
