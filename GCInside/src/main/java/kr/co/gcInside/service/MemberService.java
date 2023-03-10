package kr.co.gcInside.service;

import kr.co.gcInside.dao.MemberDAO;
import kr.co.gcInside.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    private MemberDAO dao;
    public int insertMember(MemberVO vo){
        return dao.insertMember(vo);
    }
}
