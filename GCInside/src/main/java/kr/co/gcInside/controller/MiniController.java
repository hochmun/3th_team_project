package kr.co.gcInside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023.03.27 // 라성준 // 컨트롤러 생성
 */
@Controller
public class MiniController {

    /**
     * 2023.03.27 // 라성준 //
     * 미니 갤러리 메인화면 맵핑
     * 2023/05/04 // 심규영 // 헤더 이름 구분 추가 // sName
     */
    @GetMapping(value = {"/mini/","mini/index"})
    public String mini(Model model) {
        model.addAttribute("sName","미니 갤러리");

        return "gall/mini/index";
    }
}
