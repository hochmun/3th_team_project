package kr.co.gcInside.service;

import kr.co.gcInside.dao.MemberDAO;
import kr.co.gcInside.repository.UserRepo;
import kr.co.gcInside.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private MemberDAO dao;
    @Autowired
    private UserRepo repo;
    public int insertMember(MemberVO vo){
        vo.setMember_regip(encoder.encode(vo.getMember_pass1()));
        return dao.insertMember(vo);
    }

}
