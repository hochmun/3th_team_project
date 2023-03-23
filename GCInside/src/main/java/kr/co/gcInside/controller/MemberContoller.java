package kr.co.gcInside.controller;


import com.sun.istack.NotNull;
import kr.co.gcInside.service.EmailService;
import kr.co.gcInside.service.MemberService;
import kr.co.gcInside.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.rmi.server.ServerCloneException;
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

    // 임시로 밑에 주석에있는 주소 처럼 넣으면 로그아웃 기능됨
    // a태그 사용하면 get방식으로 보내서 로그아웃시 권장되지않는방법
    // <form th:action="@{/logout}" method="post"><button type="submit"></button></form>
    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){
        // 세션 무효
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        // 쿠키 삭제
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setValue("");
                cookie.setMaxAge(0);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
        // 로그아웃 후 리다이렉트할 페이지
        return "redirect:/index";
    }

    @GetMapping("member/register")
    public String register() {
        return "member/register";
    }

    @PostMapping("member/register")
    public String register(@NotNull MemberVO vo, @NotNull HttpServletRequest req) {
        vo.setMember_regip(req.getRemoteAddr());
        int result = service.insertMember(vo);
        return "redirect:/index?success"+result;
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
    @ResponseBody
    @GetMapping("member/checkEmail")
    public Map<String, Object> checkEmail(@RequestParam(value = "member_email") String member_email) {
        Map<String, Object> resultMap = new HashMap<>();
        boolean isExistEmail = service.isExistEmail(member_email);
        if (isExistEmail) {
            resultMap.put("result", "success");
            resultMap.put("message", "존재하는 이메일 입니다.");
        } else {
            resultMap.put("result", "fail");
            resultMap.put("message", "존재하지않는 이메일 입니다.");
        }
        return resultMap;
    }
    /** 2023-03-22
     * 전인준
     * 아이디 찾기 컨트롤러 PostMapping
     *  **/
    @PostMapping("member/sendIdCode") // 아이디 찾는 컨트롤러
    public String sendIdCode(@RequestParam String member_email)throws EmailException {
        String result = service.selectMemberIdByEmail(member_email);
        if(result != null){
            String subject = "지시인사이드 아이디찾기 안내";
            String body    = "입력하신 이메일로 조회된 아이디는 " + result + " 입니다.";
            emailService.sendEmail(member_email, subject, body);
            return "/index";
        }else{
            return "/member/find_id";
        }
    }

    @PostMapping("member/sendEmailCode") // 이메일보내는 컨트롤러
    public ResponseEntity<?> sendEmailCode(@RequestParam String email, HttpSession session) throws Exception {
        String code = emailService.sendEmailCode(email, session);
        return ResponseEntity.ok(code);
    }
    /* @ResponseBody 어노테이션은 생략가능,ResponseEntity를 반환할 땐
       자동으로 응답 body에 데이터가 들어감 */
    @PostMapping("member/AuthCode")
    public ResponseEntity<String> AuthCode(@RequestParam("code") String code, HttpSession session,HttpServletRequest req) {
        String sessionCode = (String) session.getAttribute("code");
        System.out.println("sessionCode: " + sessionCode + ", code: " + code);//
        if (sessionCode != null && sessionCode.equals(code)) { // 인증코드 일치
            session.removeAttribute("code"); // 인증성공시 세션에서 인증코드 제거
            return ResponseEntity.ok("success");
        } else { // 인증코드 불일치
            return ResponseEntity.badRequest().body("fail");
        }
    }


}
