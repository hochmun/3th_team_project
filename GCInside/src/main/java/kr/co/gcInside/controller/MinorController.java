package kr.co.gcInside.controller;

import kr.co.gcInside.service.MinorService;
import kr.co.gcInside.service.TermsService;
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
@Slf4j
@Controller
public class MinorController{

    @Autowired
    private MinorService service;
    @Autowired
    private TermsService tservice;

    @GetMapping(value = {"/m/","m/index"})
    public String minorindex(Model model){
        List<galleryVO> hot_mgall = service.selecthotmgall();
        List<galleryVO> new_mgall = service.selectnewmgall();
        model.addAttribute("hot_mgall",hot_mgall);
        model.addAttribute("new_mgall",new_mgall);
        return "gall/m/index";
    }
    @GetMapping("m/create")
    public String minorcreateview(Model model){
        List<CreateVO> cate2 = service.selectcate2();
        model.addAttribute("cate2",cate2);
        TermsVO data1 = tservice.selectTerm(21);
        TermsVO data2 = tservice.selectTerm(22);
        model.addAttribute("termdata1", data1);
        model.addAttribute("termdata2", data2);
        return "gall/m/create";
    }
    @PostMapping("m/create")
    public String minorcreate(CreateVO frmCreate){
        service.creategall(frmCreate);

        return "gall/m/index";
    }
    @ResponseBody
    @GetMapping("m/chkName")
    public Map<String, Object> chkName(@RequestParam("gell_create_name") String gell_create_name){
        Map<String, Object> resultMap =new HashMap<>();
        boolean isdupli = service.isdupli(gell_create_name);
        if(isdupli){
            resultMap.put("result", "fail");
            resultMap.put("message", "이미 사용 중인 갤러리 명입니다.");
        } else {
            resultMap.put("result", "success");
            resultMap.put("message", "사용 가능한 갤러리 명입니다.");
        }
        return resultMap;
    }
    @ResponseBody
    @GetMapping("m/chkAddress")
    public Map<String, Object> chkAddress(@RequestParam("gell_create_address") String gell_create_address){
        Map<String, Object> resultMap =new HashMap<>();
        boolean isdupliad = service.isdupliad(gell_create_address);
        if(isdupliad){
            resultMap.put("result", "fail");
            resultMap.put("message", "이미 사용 중인 갤러리 주소입니다.");
        } else {
            resultMap.put("result", "success");
            resultMap.put("message", "사용 가능한 갤러리 주소입니다.");
        }
        return resultMap;
    }


}