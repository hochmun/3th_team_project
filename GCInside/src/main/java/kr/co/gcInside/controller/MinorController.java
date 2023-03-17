package kr.co.gcInside.controller;

import kr.co.gcInside.service.MinorService;
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

/**
 * 2023/03/16 // 김동민 // 갤러리 개설 기능구현 중
 */
@Slf4j
@Controller
public class MinorController{

    @Autowired
    private MinorService service;
    @GetMapping("m/create")
    public String minorcreateview(Model model){
        List<CreateVO> cate2 = service.selectcate2();
        String minorterms = service.selectminorterms();
        model.addAttribute("terms",minorterms);
        model.addAttribute("cate2",cate2);
        return "gall/m/create";
    }
    @PostMapping("m/create")
    public String minorcreate(CreateVO frmCreate){
        service.creategall(frmCreate);
        return "gall/m/create";
    }
}