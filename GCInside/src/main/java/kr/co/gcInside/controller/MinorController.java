package kr.co.gcInside.controller;

import kr.co.gcInside.security.MyUserDetails;
import kr.co.gcInside.service.MinorService;
import kr.co.gcInside.service.TermsService;
import kr.co.gcInside.vo.CreateVO;
import kr.co.gcInside.vo.TermsVO;
import kr.co.gcInside.vo.galleryVO;
import kr.co.gcInside.vo.gell_articleVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    /**
     * 2023/03/28 // 김동민 // 마이너 인덱스 순위변동 기능구현 중
     * @param model
     * @return
     */
    @GetMapping(value = {"/mgall/","mgall/index"})
    public String minorindex(Model model){
        service.minorinit();
        log.info("! minor rank update !");
        List<galleryVO> hot_mgall = service.selecthotmgall();
        List<galleryVO> new_mgall = service.selectnewmgall();
        List<galleryVO> mgall = service.selectminorgall();

        List<Integer> mgallcate1cnt = service.mgallcate1cnt();

        model.addAttribute("cate1cnt",mgallcate1cnt);

        model.addAttribute("rankdiff",service.rankdiff());
        model.addAttribute("hot_mgall",hot_mgall);
        model.addAttribute("new_mgall",new_mgall);
        model.addAttribute("mgall",mgall);
        return "gall/mgall/index";
    }

    /**
     * 2023/03/16 // 김동민 // minorgall create
     * @param model
     * @return
     */
    @GetMapping("mgall/create")
    public String minorcreateview(Model model){
        List<CreateVO> cate2 = service.selectcate2();
        model.addAttribute("cate2",cate2);
        TermsVO data1 = tservice.selectTerm(21);
        TermsVO data2 = tservice.selectTerm(22);
        model.addAttribute("termdata1", data1);
        model.addAttribute("termdata2", data2);
        return "gall/mgall/create";
    }

    /**
     * 2023/03/16 // 김동민 // minorgall create
     * @param frmCreate
     * @param myUserDetails
     * @return
     */
    @PostMapping("mgall/create")
    public String minorcreate(CreateVO frmCreate,@AuthenticationPrincipal MyUserDetails myUserDetails){
        if(myUserDetails != null)frmCreate.setGell_create_uid(myUserDetails.getUsername());
        service.creategall(frmCreate);

        return "redirect:/mgall/index";
    }

    /**
     * 2023/03/16 // 김동민 // minorgall validation
     * @param gell_create_name
     * @return
     */
    @ResponseBody
    @GetMapping("mgall/chkName")
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

    /**
     * 2023/03/16 // 김동민 // minorgall validation
     * @param gell_create_address
     * @return
     */
    @ResponseBody
    @GetMapping("mgall/chkAddress")
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