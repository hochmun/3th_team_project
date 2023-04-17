package kr.co.gcInside.service;

import kr.co.gcInside.dao.BoardDAO;
import kr.co.gcInside.dao.ManagementDAO;
import kr.co.gcInside.vo.Gell_SettingVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_manage_logVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023.03.28 // 라성준 // 매니지먼트 서비스
 */
@Slf4j
@Service
public class ManagementService {
    @Autowired
    private ManagementDAO dao;
    @Autowired
    private BoardDAO boardDAO;

    //read
    /**
     * 2023.03.28 // 라성준 // 매니지먼트 서비스
     * @param gell_address
     * @return
     */
    public Map<String, Object> selectArticleAndSetting(String gell_address) {
        return dao.selectArticleAndSetting(gell_address);
    }

    /**
     * 2023.04.12 // 라성준 //
     * @param gell_address
     * @param grade
     * @return
     */
    public galleryVO selectArticleAndSetting(String gell_address, String grade) {
        return boardDAO.selectGellInfo(gell_address, grade.equals("0") ? "m" : grade.equals("1") ? "mgall" : "mini");
    }

    /**
     * 2023.04.13 // 라성준 // 매니지먼트 수정시 7일 이내 조회
     * @param gell_num
     * @return
     */
    public boolean checkRecentGellManageLog(int gell_num) {
        int count = dao.selectRecentGellManageLog(gell_num);
        return count > 0;
    }

    // update
    /**
     * 2023.03.29 // 라성준 //
     * @param data
     * @param model
     * @return
     */
    public boolean modelInput(Map<String,String> data, Model model) {
        Map<String, Object> stringObjectMap = selectArticleAndSetting(data.get("id"));
        if (stringObjectMap == null) {
            return false;
        }

        model.addAttribute("stringObjectMap", stringObjectMap);
        return true;
    }

    /**
     * 2023.04.03 // 라성준 //
     * 갤러리 업데이트 서비스 이름
     * 2023.04.14 // 라성준 //
     * 갤러리 업데이트 서비스 설명
     * @param vo
     * @return
     */
    public boolean updateGellSetting(Gell_SettingVO vo, galleryVO galleryVO) {
        int result = dao.updateGellSetting(vo);
        result += dao.updateGell(galleryVO);
        result += dao.updateGellInfo(galleryVO);
        log.info("result : "+result);
        return result > 0;
    }

    /**
     * 2023.04.14 // 라성준
     * 갤러리 업데이트 서비스 설명
     * @param vo
     * @param galleryVO
     * @return
     */
//    public boolean updateGellSettingInfo(Gell_SettingVO vo, galleryVO galleryVO) {
//        int result = dao.updateGellSetting(vo);
//        result += dao.updateGellInfo(galleryVO);
//        log.info("result "+result);
//        return result > 0;
//    }

    /**
     * 2023.04.12 // 라성준 //
     * @param gell_name
     * @return
     */
    public boolean equalsGell(String gell_name) {
        int count = dao.equalsGell(gell_name);
        return count > 0;
    }



    // insert
    /**
     * 2023.04.12 // 라성준 // 갤러리 업데이트시 상태값 로그
     * @param
     * @return
     */
    public boolean insertGellManageLog(gell_manage_logVO gell_manage_logVO) {
        int result = dao.insertGellManageLog(gell_manage_logVO);
        return result > 0;
    }
}
