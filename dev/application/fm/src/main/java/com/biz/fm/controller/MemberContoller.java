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

import com.biz.fm.domain.Member;
import com.biz.fm.service.MemberService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberContoller {

	private final MemberService memberService;
	
	@GetMapping("/member")
	public ResponseEntity<?> list(){
		return ResponseEntity.ok(memberService.getList());
	}
	
	@GetMapping("/member/{id}")
	public ResponseEntity<?> member(@PathVariable String id){
		return ResponseEntity.ok(memberService.getMember(id));
	}
	
	@PostMapping("/member")
	public ResponseEntity<?> addMember(@RequestBody Member member){
		return ResponseEntity.ok(memberService.insertMember(member));
	}
	
	@PutMapping("/member")
	public ResponseEntity<?> updateMember(@RequestBody Member member){
		return ResponseEntity.ok(memberService.updateMember(member)); 
	}
	
	@DeleteMapping("/member/{uuid}")
	public ResponseEntity<?> deleteMember(@PathVariable String uuid){
		return ResponseEntity.ok(memberService.deleteMember(uuid));
	}
	
}
