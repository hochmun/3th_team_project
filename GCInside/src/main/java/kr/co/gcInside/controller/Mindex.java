package kr.co.gcInside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023.03.27 // 라성준 // 컨트롤러 생성
 */
@Controller
public class Mindex {

    /**
     * 2023.03.27 // 라성준 //
     * 갤러리 메인화면 맵핑
     */
    @GetMapping(value = {"/mini/","m/index"})
    public String m() {
        return "gall/m/index";
    }
}
