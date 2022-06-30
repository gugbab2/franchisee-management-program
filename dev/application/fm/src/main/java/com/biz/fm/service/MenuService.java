package com.biz.fm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.biz.fm.domain.Menu;
import com.biz.fm.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuRepository menuRepository;
	
	public List<Menu> getList(){
		return menuRepository.findAll();
	}
	
	public Menu getMenu(String id) {
		return menuRepository.findById(id);
	}
	
	public Boolean insertMenu(Menu menu) {
		return menuRepository.insert(menu)>0?true:false;
	}
	
	public Boolean updateMenu(Menu requestMenu) {
		Menu newMember = menuRepository.findById(requestMenu.getId());
		
		if(requestMenu.getId() != null) newMember.setId(requestMenu.getId());
		if(requestMenu.getName() != null) newMember.setName(requestMenu.getName());
		if(requestMenu.getPrice() != null) newMember.setPrice(requestMenu.getPrice());
		if(requestMenu.getDescription() != null) newMember.setDescription(requestMenu.getDescription());
		if(requestMenu.getImage() != null) newMember.setImage(requestMenu.getImage());
		if(requestMenu.getBusinessNumber() != null) newMember.setBusinessNumber(requestMenu.getBusinessNumber());
		
		return menuRepository.update(newMember)>0?true:false;
	}

	public Boolean deleteMenu(String id) {
		return menuRepository.delete(id)>0?true:false;
	}

}
