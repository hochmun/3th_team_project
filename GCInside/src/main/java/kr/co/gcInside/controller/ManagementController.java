package kr.co.gcInside.controller;

import kr.co.gcInside.service.ManagementService;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

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
     *      들어오는 값
     *          id : 갤러리 주소(gell_address)
     * @return
     */
    @GetMapping("gall/management/index")
    public String index (@RequestParam Map<String, String> data, Model model) {
        Map<String, Object> stringObjectMap = service.selectArticleAndSetting(data.get("id"));



        log.info("map : " + (stringObjectMap != null ? stringObjectMap.toString() : null));
        log.info("address : "+data.get("id"));
        model.addAttribute("stringObjectMap", stringObjectMap);

        return "gall/management/index";
    }

    @GetMapping("gall/management/delete")
    public String delete () {
        return "gall/management/delete";
    }

    @GetMapping("gall/management/gallery")
    public String gallery () {
        return "gall/management/gallery";
    }

    @GetMapping("gall/management/report")
    public String report () {
        return "gall/management/report";
    }

    @GetMapping("gall/management/submanager")
    public String submanager () {
        return "gall/management/submanager";
    }

    @GetMapping("gall/management/submanager_certification")
    public String submanager_certification () {
        return "gall/management/submanager_certification";
    }

    @GetMapping("gall/management/block")
    public String block(){
        return "gall/management/block";
    }
}
