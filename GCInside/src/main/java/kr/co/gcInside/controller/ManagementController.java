package kr.co.gcInside.controller;

import kr.co.gcInside.service.ManagementService;
import kr.co.gcInside.vo.Gell_SettingVO;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023.03.28 // 라성준 // 매니지먼트 컨트롤러 생성
 */
@Slf4j
@Controller
public class ManagementController {

    @Autowired
    private ManagementService service;

    /**
     * 2023.03.29 // 라성준 //
     *      들어오는 값
     *          id : 갤러리 주소(gell_address)
     *          cate : 갤러리 카테고리(gell_cate)
     * @return
     */
    @GetMapping("gall/management/index")
    public String index (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        String gell_address = data.get("id");
        Map<String, Object> stringObjectMap = service.selectArticleAndSetting(gell_address);
        if (stringObjectMap == null) {
            return "error/wrongURL";
        }
        stringObjectMap.put("gell_address", gell_address);
        model.addAttribute("stringObjectMap", stringObjectMap);

        return "gall/management/index";
    }

    /**
     * 2023.04.04 // 라성준 //
     * @param data
     * @return
     */
    @PostMapping("gall/management/index")
    public String index(@RequestParam Map<String, String> data) {
        String gell_name = data.get("gell_name");
        String mg_name = data.get("mg_name");

        // gell_name 갤러리 정보 가져옴
        Map<String, Object> stringObjectMap = service.selectArticleAndSetting(gell_name);

        if (stringObjectMap == null) {
            throw new RuntimeException("갤러리 정보가 존재하지 않습니다.");
        }

        Gell_SettingVO settingVO = (Gell_SettingVO) stringObjectMap.get("gell_setting");
        settingVO.setMg_name(mg_name);

        boolean result = service.updateGellSetting(settingVO);

        if (!result) {
            throw new RuntimeException("갤러리 설정 업데이트에 실패했습니다.");
        }

        return "redirect:/gall/management/index?id=" + gell_name;
    }

    @GetMapping("gall/management/delete")
    public String delete (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/delete";

    }

    @GetMapping("gall/management/gallery")
    public String gallery (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/gallery";
    }

    @GetMapping("gall/management/report")
    public String report (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/report";
    }

    @GetMapping("gall/management/submanager")
    public String submanager (@RequestParam Map<String, String> data, Model model) {
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/submanager";
    }

    @GetMapping("gall/management/submanager_certification")
    public String submanager_certification () {
        return "gall/management/submanager_certification";
    }

    @GetMapping("gall/management/block")
    public String block(@RequestParam Map<String, String> data, Model model){
        if(!service.modelInput(data, model)) return "error/wrongURL";

        return "gall/management/block";
    }
}
