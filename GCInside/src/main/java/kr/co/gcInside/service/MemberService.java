package kr.co.gcInside.service;

import com.sun.istack.NotNull;
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

    public int insertMember(@NotNull MemberVO vo){
        vo.setMember_pass(encoder.encode(vo.getGc_pw()));
        return dao.insertMember(vo);
    }
    public boolean isExist(String member_uid){
        int count = dao.countByMemberUid(member_uid);
        return count > 0;
    }
    public boolean isExistEmail(String member_email){
        int count = dao.countByMemberEmail(member_email);
        return count > 0;
    }
    public String selectMemberIdByEmail(String member_email){
        return dao.selectMemberIdByEmail(member_email);
    }
    public String selectMemberPassByUidEmail(String member_uid,String member_email){
        return dao.selectMemberPassByUidEmail(member_uid,member_email);
    }

}
