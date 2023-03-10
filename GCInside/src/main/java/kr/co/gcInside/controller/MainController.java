package kr.co.gcInside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023/03/08 // 심규영 // 메인 컨트롤러 생성
 */
@Controller
public class MainController {

    @GetMapping(value = {"/","index"})
    public String index() {
        return "index";
    }
}
