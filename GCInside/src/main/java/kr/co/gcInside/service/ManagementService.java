package kr.co.gcInside.service;

import kr.co.gcInside.dao.ManagementDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023.03.28 // 라성준 // 매니지먼트 서비스
 */
@Service
public class ManagementService {

    @Autowired
    private ManagementDAO dao;

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
     * 2023.03.29 // 라성준 // 매니지먼트 서비스 cate
     * @param gell_cate
     * @return
     */
    public Map<String, Object> selectArticleAndSettingCate(String gell_cate) {
        return dao.selectArticleAndSettingCate(gell_cate);
    }

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

}
