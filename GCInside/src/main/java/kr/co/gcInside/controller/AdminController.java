package kr.co.gcInside.controller;

import kr.co.gcInside.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 2023/03/10 // 심규영 // 관리자 컨트롤러 생성
 */
@Controller
public class AdminController {

    /**
     * 2023/03/10 // 심규영 // 관리자 서비스 연결
     */
    @Autowired
    private AdminService service;

    /**
     * 2023/03/10 // 심규영 // 관리자 메인 인덱스 get맵핑
     */
    @GetMapping("admin/index")
    public String index() {
        return "admin/index";
    }

    /**
     * 2023/03/10 // 심규영 // 관리자 멤버 목록 및 검색 페이지 get맵핑
     * @return
     */
    @GetMapping("admin/member/search")
    public String memberSearch() {
        return "admin/member/search";
    }

    /**
     * 2023/03/10 // 심규영 // 관리자 약관 설정 페이지 get 맵핑
     * @return
     */
    @GetMapping("admin/config/terms")
    public String configTerms() {
        return "admin/config/terms";
    }
}
