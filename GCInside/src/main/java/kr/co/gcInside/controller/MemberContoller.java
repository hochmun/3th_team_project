package kr.co.gcInside.controller;


import kr.co.gcInside.service.MemberService;
import kr.co.gcInside.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
public class MemberContoller {
    @Autowired
    private MemberService service;

    @GetMapping("member/login")
    public String login(){
        return "member/login";
    }
    @GetMapping("member/terms")
    public String terms(){
        return "member/terms";
    }
    @GetMapping("member/register")
    public String register(){
        return "member/register";
    }
    @PostMapping("member/register")
    public String register(MemberVO vo, HttpServletRequest req){
        vo.setMember_regip(req.getRemoteAddr());
        int result = service.insertMember(vo);
        return "redirect:/member/login?success"+result;
    }
    @GetMapping("member/find_id")
    public String find_id(){
        return "member/find_id";
    }
    @GetMapping("member/reset_pwd")
    public String reset_pwd(){
        return "member/reset_pwd";
    }
    @GetMapping("member/reset_pwd_Result")
    public String reset_pwd_Result(){
        return "member/reset_pwd_Result";
    }

    @ResponseBody
    @GetMapping("member/checkUid")
    public Map<String, Object> checkUid(@RequestParam("member_uid") String member_uid){
        Map<String, Object> resultMap = new HashMap<>();

        boolean isExist = service.isExist(member_uid);
        if(isExist){
            resultMap.put("result", "fail");
            resultMap.put("message", "이미 사용 중인 아이디 입니다.");
        }else{
            resultMap.put("result", "success");
            resultMap.put("message", "사용 가능한 아이디 입니다.");
        }
        return resultMap;
    }

}
