package kr.co.gcInside.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberContoller {

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

}
