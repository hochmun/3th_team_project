package kr.co.gcInside.service;

import kr.co.gcInside.dao.MemberDAO;
import kr.co.gcInside.repository.UserRepo;
import kr.co.gcInside.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class MemberService {
    @Autowired
    private MemberDAO dao;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepo repo;

    public int insertMember(MemberVO vo){
        vo.setMember_regip(encoder.encode(vo.getMember_pass()));
        return dao.insertMember(vo);
    }
    public boolean isExist(String member_uid){
        int count = dao.countByMemberUid(member_uid);
        return count > 0;
    }

}
