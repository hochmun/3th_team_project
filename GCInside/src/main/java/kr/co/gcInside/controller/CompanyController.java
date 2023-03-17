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

    @GetMapping("company/index_en")
    public String company_en() {
        return "company/index_en";
    }

    @GetMapping("company/index_ch")
    public String company_ch() {
        return "company/index_ch";
    }

    @GetMapping("company/index_jp")
    public String company_jp() {
        return "company/index_jp";
    }



}
