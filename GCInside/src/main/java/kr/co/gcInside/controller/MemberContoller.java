package kr.co.gcInside.controller;


import kr.co.gcInside.service.EmailService;
import kr.co.gcInside.service.MemberService;
import kr.co.gcInside.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
public class MemberContoller {
    @Autowired
    private MemberService service;
    @Autowired
    private EmailService emailService;

    @GetMapping("member/login")
    public String login() {
        return "member/login";
    }

    @GetMapping("member/terms")
    public String terms() {
        return "member/terms";
    }

    @GetMapping("member/register")
    public String register() {
        return "member/register";
    }

    @PostMapping("member/register")
    public String register(MemberVO vo, HttpServletRequest req) {
        vo.setMember_regip(req.getRemoteAddr());
        int result = service.insertMember(vo);
        return "redirect:/member/login?success" + result;
    }

    @GetMapping("member/find_id")
    public String find_id() {
        return "member/find_id";
    }

    @GetMapping("member/reset_pwd")
    public String reset_pwd() {
        return "member/reset_pwd";
    }

    @GetMapping("member/reset_pwd_Result")
    public String reset_pwd_Result() {
        return "member/reset_pwd_Result";
    }

    @ResponseBody
    @GetMapping("member/checkUid")
    public Map<String, Object> checkUid(@RequestParam("member_uid") String member_uid) {
        Map<String, Object> resultMap = new HashMap<>();
        boolean isExist = service.isExist(member_uid);
        if (isExist) {
            resultMap.put("result", "fail");
            resultMap.put("message", "이미 사용 중인 아이디 입니다.");
        } else {
            resultMap.put("result", "success");
            resultMap.put("message", "사용 가능한 아이디 입니다.");
        }
        return resultMap;
    }

    @PostMapping("member/sendEmailCode") // 이메일보내는 컨트롤러
    public ResponseEntity<?> sendEmailCode(@RequestParam String email, HttpSession session) throws Exception {
        String code = emailService.sendEmailCode(email,session);
        session.setAttribute("code", code);
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping("member/AuthCode") // 인증코드 확인 컨트롤러
    public ResponseEntity<String> AuthCode(@RequestParam("code") String code, HttpSession session) {
        String sessionCode = (String) session.getAttribute("code");
        if (sessionCode != null && sessionCode.equals(code)) { // 인증코드 일치
            session.removeAttribute("code"); // 세션에서 인증코드 제거
            return ResponseEntity.ok("success");
        } else { // 인증코드 불일치
            return ResponseEntity.badRequest().build();
        }
    }
}
