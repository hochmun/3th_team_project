package kr.co.gcInside.service;

import kr.co.gcInside.dao.AdminDAO;
import kr.co.gcInside.vo.MemberVO;
import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.gall_cate2VO;
import kr.co.gcInside.vo.galleryVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 2023/03/10 // 심규영 // 관리자 서비스 생성
 */
@Service
public class AdminService {

    /**
     * 2023/03/10 // 심규영 // 관리자 DAO 연결
     */
    @Autowired
    private AdminDAO dao;

    // create

    /**
     * 2023/03/16 // 김재준 // 관리자 메인 갤러리 생성
     * @param vo
     */
    public int createMainGallery(galleryVO vo) {
        return dao.createMainGallery(vo);
    }

    /**
     * 2023/03/20 // 심규영 // 관리자 메인 갤러리 생성 셋팅 생성 추가
     * @return
     */
    public int createMainGallerySetting(int gell_num) {
        return dao.createMainGallerySetting(gell_num);
    }

    // read

    /**
     * 2023/03/16 // 김재준 // 갤러리 카테고리 불러오기
     * @return
     */
    public List<gall_cate2VO> selectGalleryCates(){
        return dao.selectGalleryCates();
    }

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 불러오기
     * @return
     */
    public List<TermsVO> selectTerms() {
        return dao.selectTerms();
    }

    /**
     * 2023/3/16 // 라성준 // 관리자 멤버 불러오기
     * @return
     */
    public List<MemberVO> SearchMember(int start) {
        return dao.SearchMember(start);
    }

    /**
     * 2023.03.17 // 라성준 // 관리자 검색 조건에 따른 회원 정보 불러오기
     * @return
     */
    public List<MemberVO> searchMembersByCondition(String searchType, String keyword,int start) {
        return dao.searchMembersByCondition(searchType, keyword, start);
    }

    /**
     * 2023/03/21 // 라성준 // 관리자 페이징
     * @return
     */
    public int searchMemberCount() {
        return dao.searchMemberCount();
    }

    /**
     * 2023/03/21 // 라성준 // 관리자 갤러리 리스트 불러오기
     * @return
     */
    public List<galleryVO> AdminGalleryList() {
        return dao.AdminGalleryList();
    }

    // upload
    /**
     * 2023/03/10 // 심규영 // 관리자 약관 업데이트
     * @return
     */
    public int updateTerms(String type, String content) {
        return dao.updateTerms(type, content);
    }

    // delete
    // service
}
