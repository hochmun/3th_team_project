package kr.co.gcInside.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
