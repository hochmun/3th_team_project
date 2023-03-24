package kr.co.gcInside.dao;

import kr.co.gcInside.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberDAO {
    public int insertMember(MemberVO vo);
    public int countByMemberUid(String member_uid);
    public int countByMemberEmail(String member_email);
    public String selectMemberIdByEmail(String member_email);
    /**
     * 2023-03-23 // 전인준
     * 아이디,이메일 인증 메서드
     * */
    public String selectMemberPassByUidEmail(String member_uid,String member_email);
    /**
     * 2023-03-24 // 전인준
     * 비밀번호 업데이트 메서드
     * */
    public int updateMemberPass(MemberVO vo);
    

}
