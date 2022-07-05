package com.biz.fm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biz.fm.domain.Fimage;
import com.biz.fm.service.FimageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/fimage")
@RequiredArgsConstructor
public class FimageController {
	
	private final FimageService fimageService;
	
	@GetMapping
	public ResponseEntity<List<Fimage>> getListAll(){
		 return ResponseEntity.ok(fimageService.findAll());
	}
	
	@GetMapping("/{businessNumber}")
	public ResponseEntity<List<Fimage>> getListByBusinessNumber(@PathVariable String businessNumber){
		 return ResponseEntity.ok(fimageService.findAll());
	}
	
	@GetMapping("/{fimageId}")
	public ResponseEntity<Fimage> get(@PathVariable String fimageId){
		return ResponseEntity.ok(fimageService.findById(fimageId));
	}
	
	@PostMapping
	public ResponseEntity<Integer> add(@RequestBody Fimage fimage){
		return ResponseEntity.ok(fimageService.insert(fimage));
	}
	
	@PutMapping("/{fimageId}")
	public ResponseEntity<Integer> update(@PathVariable String fimageId, @RequestBody Fimage fimage){
		return ResponseEntity.ok(fimageService.update(fimageId, fimage));
	}
	
	@DeleteMapping("/{fimageId}")
	public ResponseEntity<Integer> delete(@PathVariable String fimageId){
		return ResponseEntity.ok(fimageService.delete(fimageId));
	}
	
}
