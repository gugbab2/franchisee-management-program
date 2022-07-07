package com.biz.fm.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.biz.fm.domain.entity.Menu;
import com.biz.fm.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuRepository menuRepository;
	
	public List<Menu> getList(){
		return menuRepository.findAll();
	}
	
	public List<Menu> listByBusinessNumber(String businessNumber){
		return menuRepository.findBybusinessNumber(businessNumber);
	}
	
	public Menu getMenu(String id) {
		return menuRepository.findById(id);
	}
	
	public Boolean insertMenu(Menu menu) {
		menu.setId(UUID.randomUUID().toString());
		return menuRepository.insert(menu) > 0 ? true : false;
	}
	
	public Boolean updateMenu(String menuId, Menu menu) {
		Menu oldMenu = this.getMenu(menuId);
		Menu newMenu = oldMenu.patch(menu);
		
		return menuRepository.update(newMenu) > 0 ? true : false;
	}

	public Boolean deleteMenu(String id) {
		return menuRepository.delete(id) > 0 ? true : false;
	}

}
