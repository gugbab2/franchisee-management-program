package com.biz.fm.service;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import com.biz.fm.domain.dto.MemberDto;
import com.biz.fm.domain.dto.FimageDto.FimageRead;
import com.biz.fm.domain.dto.MemberDto.MemberRead;
import com.biz.fm.domain.dto.MemberDto.MemberUpdate;
import com.biz.fm.domain.dto.MemberDto.SignIn;
import com.biz.fm.domain.entity.Fimage;
import com.biz.fm.domain.entity.Member;
import com.biz.fm.exception.custom.DeleteFailException;
import com.biz.fm.exception.custom.InsertFailException;
import com.biz.fm.exception.custom.UpdateFailException;
import com.biz.fm.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberRepository memberRepository;
	
	public List<MemberRead> getList() throws NotFoundException{
		List<MemberRead> memberReads = memberRepository.findAll();
		if(memberReads.size() == 0) throw new NotFoundException(null);
		return memberReads;
	}
	
	public MemberRead getMemberById(String memberId) throws NotFoundException {
		MemberRead memberRead = memberRepository.findDtoById(memberId);
		if(memberRead == null) throw new NotFoundException(null);
		return memberRead;
	}
	
	public MemberRead getMemberByEmail(String email) throws NotFoundException {
		MemberRead memberRead = memberRepository.findDtoByEmail(email);
		if(memberRead == null) throw new NotFoundException(null);
		return memberRead;
	}
	
	public MemberRead insert(SignIn member) {
		member.setId(UUID.randomUUID().toString().replace("-", ""));
		
		int result = memberRepository.insert(member);
		if(result > 0) {
			return memberRepository.findDtoById(member.getId());
		}
		else throw new InsertFailException();
	}
	
	public MemberRead update(String memberId, MemberUpdate member) {
		Member oldMember = memberRepository.findEntityById(memberId);
		if(oldMember == null) throw new UpdateFailException();
		
		Member newMember = oldMember.patch(member);
		System.out.println(oldMember.getBirth());
		System.out.println(newMember.getBirth());
		
		int result = memberRepository.update(newMember);
		if(result > 0) {
			return memberRepository.findDtoById(memberId);
		}
		else throw new UpdateFailException();
	}

	public MemberRead delete(String memberId) {
		MemberRead memberRead = memberRepository.findDtoById(memberId);
		if(memberRead == null) throw new DeleteFailException();
		
		int result = memberRepository.delete(memberId);
		if(result > 0) {
			return memberRead;
		}
		else throw new DeleteFailException();
	}

}
