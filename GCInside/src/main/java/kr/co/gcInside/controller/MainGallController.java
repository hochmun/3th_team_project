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
     * 2023.04.17 // 김동민 //
     * 갤러리 랭킹, 흥한 갤러리 불러오기, 신설 갤러리 불러오기, 갤러리 카테고리별 분류
     * 2023/05/04 // 심규영 // 헤더 이름 구분 추가 // sName
     */
    @GetMapping(value = {"m/","m/index"})
    public String m(Model model) {
        service.gallinit();
        log.info("! gall rank update !");
        List<galleryVO> hot_gall = service.selecthotgall();
        List<galleryVO> new_gall = service.selectnewgall();
        List<galleryVO> gall=service.selectgall();
        List<Integer> gallcate1cnt = service.gallcate1cnt();
        model.addAttribute("cate1cnt",gallcate1cnt);
        model.addAttribute("rankdiff",service.rankdiff());
        model.addAttribute("hotarticle",service.selecthotarticle());
        model.addAttribute("hot_gall",hot_gall);
        model.addAttribute("new_gall",new_gall);
        model.addAttribute("gall",gall);
        model.addAttribute("sName","갤러리");
        return "gall/m/index";

    }


}
