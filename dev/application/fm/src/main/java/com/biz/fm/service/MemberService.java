package com.biz.fm.service;

import java.util.List;

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
		return memberRepository.findByEmail(id);
	}
	
	public Boolean insertMember(Member member) {
		return memberRepository.insert(member) > 0 ? true : false;
	}
	
	public Boolean updateMember(String memberId, Member requestMember) {
		Member oldMember = this.getMember(memberId);
		Member newMember = oldMember.patch(requestMember);
		
		return memberRepository.update(newMember) > 0 ? true : false;
	}

	public Boolean deleteMember(String id) {
		return memberRepository.delete(id) > 0 ? true : false;
	}

}
