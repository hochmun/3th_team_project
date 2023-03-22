package kr.co.gcInside.dao;

import kr.co.gcInside.vo.*;
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

    /**
     * 2023/03/23 // 김재준 // 관리자 마이너 갤러리 생성
     */
    public int createMinorGallery(CreateVO vo);

    /**
     * 2023/03/20 // 심규영 // 관리자 메인 갤러리 생성 셋팅 생성 추가
     * @return
     */
    public int createMainGallerySetting(@Param("gell_num") int gell_num);

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

    /**
     * 2023.03.16 // 라성준 // 서치멤버 불러오기
     * @return
     */
    public List<MemberVO> SearchMember(@Param("start") int start);

    /**
     * 2023.03.17 // 라성준 // 관리자 검색 조건에 따른 회원 정보 불러오기
     * @return
     */
    public List<MemberVO> searchMembersByCondition(@Param("searchType") String searchType,
                                                   @Param("keyword") String keyword,
                                                   @Param("start") int start);


    /**
     * 2023/03/21 // 라성준 // 관리자 페이징
     * @return
     */
    public int searchMemberCount();

    /**
     * 2023/03/21 // 라성준 // 관리자 갤러리 리스트 불러오기
     * @return
     */
    public List<galleryVO> AdminGalleryList(@Param("start") int start);

    /**
     * 2023.03.22 // 라성준 // 관리자 갤러리 검색 조건에 따른 갤러리 정보 불러오기
     * @param searchType
     * @param keyword
     * @param start
     * @return
     */
    public List<galleryVO> searchAdminGalleryList(@Param("searchType") String searchType,
                                                  @Param("keyword") String keyword,
                                                  @Param("start") int start);

    /**
     * 2023/03/22
     * @return
     */
    public int searchAdminGalleryTotal();

    /**
     * 2023/03/22 // 김재준 // 관리자 갤러리 개설신청 리스트 불러오기
     */
    public List<CreateVO> galleryRequestList();

    // upload

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 업데이트
     * @return
     */
    public int updateTerms(@Param("type") String type, @Param("content") String content);

    // delete
}
