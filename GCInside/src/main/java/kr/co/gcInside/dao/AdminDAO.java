package kr.co.gcInside.dao;

import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.gall_cate2VO;
import kr.co.gcInside.vo.galleryVO;
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

    /**
     * 2023/03/16 // 김재준 // 관리자 메인 갤러리 생성
     * @param vo
     */
    public int createMainGallery(galleryVO vo);

    // read

    /**
     * 2023/03/16 // 김재준 // 갤러리 카테고리 불러오기
     * @return
     */
    public List<gall_cate2VO> selectGalleryCates();

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 불러오기
     * @return
     */
    public List<TermsVO> selectTerms();

    // upload

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 업데이트
     * @return
     */
    public int updateTerms(@Param("type") String type, @Param("content") String content);

    // delete
}
