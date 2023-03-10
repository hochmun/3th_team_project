package kr.co.gcInside.service;

import kr.co.gcInside.dao.AdminDAO;
import kr.co.gcInside.vo.TermsVO;
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
    // read
    /**
     * 2023/03/10 // 심규영 // 관리자 약관 불러오기
     * @return
     */
    public List<TermsVO> selectTerms() {
        return dao.selectTerms();
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
