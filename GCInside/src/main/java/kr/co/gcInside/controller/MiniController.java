package kr.co.gcInside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023.03.27 // 라성준 // 컨트롤러 생성
 */
@Controller
public class MiniController {

    /**
     * 2023.03.27 // 라성준 //
     * 미니 갤러리 메인화면 맵핑
     */
    @GetMapping(value = {"/mini/","mini/index"})
    public String mini() {
        return "gall/mini/index";
    }
}
