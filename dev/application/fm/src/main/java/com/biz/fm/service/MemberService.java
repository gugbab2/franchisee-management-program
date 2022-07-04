package com.biz.fm.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.biz.fm.domain.Member;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	public List<Member> getList(){
		return memberRepository.findAll();
	}
	
	public Member getMember(String id) {
		return memberRepository.findById(id);
	}
	
	public Boolean insertMember(Member member) {
		return memberRepository.insert(member)>0?true:false;
	}
	
	public Boolean updateMember(Member requestMember) {
		Member oldMember = this.getMember(requestMember.getId());
		Member newMember = oldMember.patch(requestMember);
		
		return memberRepository.update(newMember)>0?true:false;
	}

	public Boolean deleteMember(String id) {
		return memberRepository.delete(id)>0?true:false;
	}

}
