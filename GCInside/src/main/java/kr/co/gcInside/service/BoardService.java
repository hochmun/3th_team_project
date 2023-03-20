package kr.co.gcInside.service;

import kr.co.gcInside.dao.BoardDAO;
import kr.co.gcInside.vo.galleryVO;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 2023/03/20 // 심규영 // 보드 서비스 생성
 */
@Service
public class BoardService {

    /**
     * 2023/03/20 // 심규영 // board dao 연결
     */
    @Autowired
    private BoardDAO dao;
    
    // create
    // read

    /**
     * 2023/03/20 // 심규영 // 갤러리 정보 불러오기
     * @param gell_address
     * @return
     */
    public galleryVO selectGellInfo(String gell_address) {
        return dao.selectGellInfo(gell_address);
    }

    // upload
    // delete
    // service

    /**
     * 2023/03/20 // 심규영 // URL 체크 기능
     */
    public boolean URLCheck(String grade, String type) {
        // 체크용 result , 기본 false : 통과
        boolean result = false;

        // 갤러리 등급 주소 확인
        if(!grade.equals("m") && !grade.equals("mgall") && !grade.equals("mini")) result = true;

        // 갤러리 보드 주소 확인
        if(!type.equals("view") && !type.equals("modify") && !type.equals("write")) result = true;

        return result;
    }
}
