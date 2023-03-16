package kr.co.gcInside.dao;

import kr.co.gcInside.vo.MemberVO;
import kr.co.gcInside.vo.TermsVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 2023/03/10 // 심규영 // 관리자 DAO 생성
 */
@Mapper
@Repository
public interface AdminDAO {
    // create
    // read

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 불러오기
     * @return
     */
    public List<TermsVO> selectTerms();

    /**
     * 2023.03.16 // 라성준 // 서치멤버 불러오기
     * @return
     */
    public List<MemberVO> SearchMember();

    // upload

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 업데이트
     * @return
     */
    public int updateTerms(@Param("type") String type, @Param("content") String content);

    // delete
}
