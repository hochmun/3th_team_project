package kr.co.gcInside.controller;

import kr.co.gcInside.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

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

}
