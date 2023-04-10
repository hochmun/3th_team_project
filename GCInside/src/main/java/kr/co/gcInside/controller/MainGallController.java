package kr.co.gcInside.controller;

import kr.co.gcInside.service.MainService;
import kr.co.gcInside.vo.galleryVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * 2023.03.27 // 라성준 // 컨트롤러 생성
 */
@Slf4j
@Controller
public class MainGallController {

    @Autowired
    private MainService service;
    /**
     * 2023.03.27 // 라성준 //
     * 갤러리 메인화면 맵핑
     */
    @GetMapping(value = {"m/","m/index"})
    public String m(Model model) {
        service.gallinit();
        log.info("! gall rank update !");
        List<galleryVO> hot_gall = service.selecthotgall();
        List<galleryVO> new_gall = service.selectnewgall();
        model.addAttribute("hotarticle",service.selecthotarticle());
        model.addAttribute("hot",hot_gall);
        model.addAttribute("new",new_gall);
        return "gall/m/index";

    }


}
