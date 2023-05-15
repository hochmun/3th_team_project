package kr.co.gcInside.controller;

import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.utill.SecurityCheckUtil;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public String mini(Model model, @AuthenticationPrincipal MyUserDetails myUserDetails) {
        model.addAttribute("sName","미니 갤러리");
        model.addAttribute("authorize", new SecurityCheckUtil().getSecurityInfoDTO(myUserDetails));     // "authorize"라는 이름으로 MyUserDetails 객체를 이용하여 보안 정보 데이터 전달

        if(myUserDetails != null) model.addAttribute("user", myUserDetails.getUser());

        return "gall/mini/index";
    }

    /**
     * 2023/05/15 // 심규영 // 경로 생성
     */
    @GetMapping("/mini/create")
    public String miniCreate() {
        return "gall/mini/create";
    }
}
