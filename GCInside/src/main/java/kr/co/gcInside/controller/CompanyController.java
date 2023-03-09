package kr.co.gcInside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023/03/09 // 라성준 // 회사소개 컨트롤러
 */

@Controller
public class CompanyController {

    @GetMapping("company/index")
    public String company() {
        return "company/index";
    }


}
