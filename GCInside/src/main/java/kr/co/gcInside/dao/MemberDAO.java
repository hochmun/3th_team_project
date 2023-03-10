package kr.co.gcInside.dao;

import kr.co.gcInside.vo.MemberVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberDAO {
    public int insertMember(MemberVO vo);
    public int countByMemberUid(String member_uid);

}
