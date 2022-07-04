package com.biz.fm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.biz.fm.domain.Menu;
import com.biz.fm.service.MenuService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class MenuController {

private final MenuService menuService;
	
	@GetMapping("/menu")
	public ResponseEntity<?> list(){
		return ResponseEntity.ok(menuService.getList());
	}
	
	@GetMapping("/menu/{id}")
	public ResponseEntity<?> menu(@PathVariable String id){
		return ResponseEntity.ok(menuService.getMenu(id));
	}
	
	@PostMapping("/menu")
	public ResponseEntity<?> addMenu(@RequestBody Menu menu){
		return ResponseEntity.ok(menuService.insertMenu(menu));
	}
	
	@PutMapping("/menu")
	public ResponseEntity<?> updateMenu(@RequestBody Menu menu){
		return ResponseEntity.ok(menuService.updateMenu(menu));
	}
	
	@DeleteMapping("/menu/{id}")
	public ResponseEntity<?> deleteMenu(@PathVariable String id){
		return ResponseEntity.ok(menuService.deleteMenu(id));
	}
}
