package kr.co.gcInside.service;

import kr.co.gcInside.dao.AdminDAO;
import kr.co.gcInside.vo.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    /**
     * 2023/03/23 // 김재준 // 관리자 마이너 갤러리 생성
     */
    public int createMinorGallery(galleryVO vo) {
        return dao.createMinorGallery(vo);
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
    public List<galleryVO> AdminGalleryList(int start) {
        return dao.AdminGalleryList(start);
    }

    /**
     * 2023/03/22 // 라성준 // 관리자 갤러리 검색 조건에 따른 갤러리 리스트 정보 불러오기
     * @param searchType
     * @param keyword
     * @param start
     * @return
     */
    public List<galleryVO> searchAdminGalleryList(String searchType, String keyword, int start) {
        return dao.searchAdminGalleryList(searchType, keyword, start);
    }

    /**
     * 2023/03/22
     * @return
     */
    public int searchAdminGalleryTotal(){
        return dao.searchAdminGalleryTotal();
    }

    /**
     * 2023/03/22 // 김재준 // 관리자 갤러리 개설신청 리스트 불러오기
     */
    public List<CreateVO> galleryRequestList(int start, int perPage) {
        return dao.galleryRequestList(start, perPage);
    }

    /**
     * 2023/03/22 // 김재준 // 관리자 갤러리 개설신청 리스트 총 개수
     */
    public int galleryRequestTotal() {
        return dao.galleryRequestTotal();
    }

    /**
     * 2023/03/28 // 김재준 // 관리자 갤러리 개설신청 카테고리 검색
     */
    public List<CreateVO> searchByCategory(int category, int start, int perPage) {
        return dao.searchByCategory(category, start, perPage);
    }

    /**
     * 2023/03/28 // 김재준 // 관리자 갤러리 개설신청 카테고리 검색 총 개수
     * @param category
     * @return
     */
    public int searchByCategoryTotal(int category) {
        return dao.searchByCategoryTotal(category);
    }

    // upload
    /**
     * 2023/03/10 // 심규영 // 관리자 약관 업데이트
     * @return
     */
    public int updateTerms(String type, String content) {
        return dao.updateTerms(type, content);
    }

    /**
     * 2023/03/23 // 김재준 // 갤러리 개설요청 `gell_create_status` 업데이트
     */
    public void updateGalleryCreateStatus(CreateVO cvo) {
        dao.updateGalleryCreateStatus(cvo);
    }

    /**
     * 2023/03/27 // 김재준 // 갤러리 개설 반려사유 업데이트
     */
    public void updaterejectReason(CreateVO cvo) {
        dao.updaterejectReason(cvo);
    }

    // delete
    // service
}
