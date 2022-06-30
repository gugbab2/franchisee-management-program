package com.biz.fm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.biz.fm.domain.Franchisee;
import com.biz.fm.service.FranchiseeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/franchisee")
@RequiredArgsConstructor
public class FranchiseeController {
	
	private final FranchiseeService franchiseeService;
	
	@GetMapping
	public ResponseEntity<List<Franchisee>> getList(){
		 return ResponseEntity.ok(franchiseeService.findAll());
	}
	
	@GetMapping("/{franchiseeId}")
	public ResponseEntity<Franchisee> get(@PathVariable String franchiseeId){
		return ResponseEntity.ok(franchiseeService.findById(franchiseeId));
	}
	
	@PostMapping
	public ResponseEntity<Integer> add(@RequestBody Franchisee franchisee){
		return ResponseEntity.ok(franchiseeService.insert(franchisee));
	}
	
	@PutMapping("/{businessNumber}")
	public ResponseEntity<Integer> update(@PathVariable String businessNumber, @RequestBody Franchisee franchisee){
		return ResponseEntity.ok(franchiseeService.update(businessNumber, franchisee));
	}
	
	@DeleteMapping("/{businessNumber}")
	public ResponseEntity<Integer> delete(@PathVariable String businessNumber){
		return ResponseEntity.ok(franchiseeService.delete(businessNumber));
	}
}
