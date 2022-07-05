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
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberContoller {

	private final MemberService memberService;
	
	@GetMapping
	public ResponseEntity<?> list(){
		return ResponseEntity.ok(memberService.getList());
	}
	
	@GetMapping("/{memberId}")
	public ResponseEntity<?> member(@PathVariable String memberId){
		return ResponseEntity.ok(memberService.getMember(memberId));
	}
	
// Login으로 대체.	
//	@PostMapping
//	public ResponseEntity<?> addMember(@RequestBody Member member){
//		return ResponseEntity.ok(memberService.insertMember(member));
//	}
	
	@PutMapping("/{memberId}")
	public ResponseEntity<?> updateMember(@PathVariable String memberId, @RequestBody Member member){
		return ResponseEntity.ok(memberService.updateMember(memberId, member)); 
	}
	
	@DeleteMapping("/{memberId}")
	public ResponseEntity<?> deleteMember(@PathVariable String memberId){
		return ResponseEntity.ok(memberService.deleteMember(memberId));
	}
	
}
