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
    public List<MemberVO> SearchMember() {
        return dao.SearchMember();
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
