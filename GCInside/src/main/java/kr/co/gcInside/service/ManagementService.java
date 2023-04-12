package kr.co.gcInside.service;

import kr.co.gcInside.dao.BoardDAO;
import kr.co.gcInside.dao.ManagementDAO;
import kr.co.gcInside.vo.Gell_SettingVO;
import kr.co.gcInside.vo.galleryVO;
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

    public galleryVO selectArticleAndSetting(String gell_address, String grade) {
        return boardDAO.selectGellInfo(gell_address, grade.equals("0") ? "m" : grade.equals("1") ? "mgall" : "mini");
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
     * 갤러리 업데이트 서비스
     * @param vo
     * @return
     */
    public boolean updateGellSetting(Gell_SettingVO vo, galleryVO galleryVO) {
        int result = dao.updateGellSetting(vo);
        result += dao.updateGell(galleryVO);
        log.info("result : "+result);
        return result > 0;
    }
    public boolean equalsGell(String gell_name) {
        int count = dao.equalsGell(gell_name);
        return count > 0;
    }

    // insert


}
